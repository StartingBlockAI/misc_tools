const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

// Scrape website for tables
router.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    let validUrl;
    try {
      validUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Fetch the webpage
    const response = await axios.get(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000,
      maxRedirects: 5
    });

    // Parse HTML
    const $ = cheerio.load(response.data);
    const tables = [];

    // Find all tables
    $('table').each((index, element) => {
      const tableData = [];
      const $table = $(element);
      
      // Extract table rows
      $table.find('tr').each((i, row) => {
        const rowData = [];
        $(row).find('th, td').each((j, cell) => {
          const cellText = $(cell).text().trim().replace(/\s+/g, ' ');
          rowData.push(cellText);
        });
        
        if (rowData.length > 0) {
          tableData.push(rowData);
        }
      });

      if (tableData.length > 0) {
        // Try to use first row as header
        let processedTable = tableData;
        if (tableData.length > 1) {
          const firstRow = tableData[0];
          // Check if first row looks like headers (mostly text, not numbers)
          const isHeaderRow = firstRow.every(cell => 
            typeof cell === 'string' && 
            !cell.replace(/[.,-]/g, '').match(/^\d+$/)
          );
          
          if (isHeaderRow) {
            processedTable = tableData.slice(1);
          }
        }

        tables.push({
          id: index,
          data: processedTable,
          originalData: tableData,
          rows: processedTable.length,
          cols: processedTable[0]?.length || 0,
          title: $table.attr('id') || $table.attr('class') || `Table ${index + 1}`
        });
      }
    });

    res.json({
      success: true,
      url: validUrl.toString(),
      tablesFound: tables.length,
      tables: tables,
      html: response.data // Include the full HTML for iframe display
    });

  } catch (error) {
    console.error('Scraping error:', error);
    
    if (error.code === 'ENOTFOUND') {
      return res.status(400).json({ error: 'Website not found. Please check the URL.' });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ error: 'Request timeout. The website took too long to respond.' });
    }
    
    res.status(500).json({ 
      error: 'Failed to scrape website',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Export selected tables to Excel
router.post('/export', async (req, res) => {
  try {
    const { tables, filename, sourceUrl } = req.body;
    
    if (!tables || !Array.isArray(tables) || tables.length === 0) {
      return res.status(400).json({ error: 'No tables selected for export' });
    }

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add each table as a separate sheet
    tables.forEach((table, index) => {
      if (table.data && table.data.length > 0) {
        // Include headers if available
        let dataToExport = table.data;
        if (table.headers && table.headers.length > 0) {
          dataToExport = [table.headers, ...table.data];
        }
        
        const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
        
        // Style the header row if headers exist
        if (table.headers && table.headers.length > 0) {
          const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
          for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (!worksheet[cellAddress]) continue;
            worksheet[cellAddress].s = {
              font: { bold: true },
              fill: { fgColor: { rgb: "E3F2FD" } }
            };
          }
        }
        
        const sheetName = `Table_${index + 1}`.substring(0, 31); // Excel sheet name limit
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    });

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx',
      compression: true
    });

    // Set response headers for file download
    const safeFilename = filename.replace(/[^a-zA-Z0-9_-]/g, '_');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.xlsx"`);
    res.setHeader('Content-Length', excelBuffer.length);

    res.send(excelBuffer);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      error: 'Failed to export tables to Excel',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
