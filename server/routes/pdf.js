const express = require('express');
const pdfParse = require('pdf-parse');
const XLSX = require('xlsx');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Extract tables from PDF
router.post('/extract', async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfPath = req.file.path;
    
    try {
      // Read PDF file
      const pdfBuffer = await fs.readFile(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      
      // Extract text and look for table patterns
      const text = pdfData.text;
      const lines = text.split('\n');
      
      const tables = [];
      let currentTable = [];
      let inTable = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Look for table patterns (lines with multiple separators)
        const hasMultipleSeparators = line.includes('|') || 
                                    line.includes('\t') || 
                                    (line.match(/\s{2,}/g) && line.match(/\s{2,}/g).length >= 2);
        
        if (hasMultipleSeparators && line.length > 10) {
          // This looks like a table row
          if (!inTable) {
            inTable = true;
            currentTable = [];
          }
          
          // Parse the row
          let cells;
          if (line.includes('|')) {
            cells = line.split('|').map(cell => cell.trim());
          } else if (line.includes('\t')) {
            cells = line.split('\t').map(cell => cell.trim());
          } else {
            cells = line.split(/\s{2,}/).map(cell => cell.trim());
          }
          
          // Filter out empty cells
          cells = cells.filter(cell => cell.length > 0);
          
          if (cells.length > 1) {
            currentTable.push(cells);
          }
        } else if (inTable && line.length === 0) {
          // Empty line might indicate end of table
          if (currentTable.length > 1) {
            tables.push({
              id: tables.length,
              data: currentTable,
              rows: currentTable.length,
              cols: currentTable[0]?.length || 0,
              title: `Table ${tables.length + 1}`
            });
          }
          currentTable = [];
          inTable = false;
        } else if (inTable && !hasMultipleSeparators && line.length > 0) {
          // Non-table line while in table - might be end of table
          if (currentTable.length > 1) {
            tables.push({
              id: tables.length,
              data: currentTable,
              rows: currentTable.length,
              cols: currentTable[0]?.length || 0,
              title: `Table ${tables.length + 1}`
            });
          }
          currentTable = [];
          inTable = false;
        }
      }
      
      // Don't forget the last table
      if (inTable && currentTable.length > 1) {
        tables.push({
          id: tables.length,
          data: currentTable,
          rows: currentTable.length,
          cols: currentTable[0]?.length || 0,
          title: `Table ${tables.length + 1}`
        });
      }

      // Clean up uploaded file
      await fs.unlink(pdfPath);

      res.json({
        success: true,
        filename: req.file.originalname,
        tablesFound: tables.length,
        tables: tables
      });

    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      
      // Clean up uploaded file
      try {
        await fs.unlink(pdfPath);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
      
      res.status(400).json({ 
        error: 'Failed to parse PDF file. The file might be corrupted or password-protected.',
        details: process.env.NODE_ENV === 'development' ? parseError.message : undefined
      });
    }

  } catch (error) {
    console.error('PDF extraction error:', error);
    res.status(500).json({ 
      error: 'Failed to extract tables from PDF',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Export PDF tables to Excel
router.post('/export', async (req, res) => {
  try {
    const { tables, filename } = req.body;
    
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
        const worksheet = XLSX.utils.aoa_to_sheet(table.data);
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
    console.error('PDF export error:', error);
    res.status(500).json({ 
      error: 'Failed to export PDF tables to Excel',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
