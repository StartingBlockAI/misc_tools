import React, { useState } from 'react'
import { Globe, FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTool } from '../context/ToolContext'
import TablePreview from './TablePreview'
import WebpageViewer from './WebpageViewer'
import { scrapeWebsite, scrapePDF, exportTables } from '../services/api'

function WebScrapingTool() {
  const { 
    tables, 
    selectedTables, 
    loading, 
    error, 
    success, 
    dispatch 
  } = useTool()
  
  const [activeTab, setActiveTab] = useState('website')
  const [url, setUrl] = useState('')
  const [filename, setFilename] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [scrapedUrl, setScrapedUrl] = useState('')

  const handleWebsiteScrape = async (e) => {
    e.preventDefault()
    if (!url.trim()) return

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_MESSAGES' })

    try {
      const result = await scrapeWebsite(url)
      dispatch({ type: 'SET_TABLES', payload: result.tables })
      setScrapedUrl(result.url)
      dispatch({ 
        type: 'SET_SUCCESS', 
        payload: `Successfully found ${result.tablesFound} table(s) on the website!` 
      })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadedFile(file)
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_MESSAGES' })

    try {
      const result = await scrapePDF(file)
      dispatch({ type: 'SET_TABLES', payload: result.tables })
      dispatch({ 
        type: 'SET_SUCCESS', 
        payload: `Successfully extracted ${result.tablesFound} table(s) from PDF!` 
      })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const handleExport = async () => {
    if (selectedTables.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please select at least one table to export' })
      return
    }

    if (!filename.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a filename' })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const selectedTableData = tables.filter(table => selectedTables.includes(table.id))
      await exportTables(selectedTableData, filename, activeTab)
      dispatch({ 
        type: 'SET_SUCCESS', 
        payload: `Successfully exported ${selectedTables.length} table(s) to Excel!` 
      })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const handleSelectAll = () => {
    if (selectedTables.length === tables.length) {
      dispatch({ type: 'CLEAR_SELECTION' })
    } else {
      dispatch({ type: 'SELECT_ALL_TABLES' })
    }
  }

  const handleTableToggle = (tableId) => {
    dispatch({ type: 'TOGGLE_TABLE_SELECTION', payload: tableId })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Web Scraping Tool
        </h1>
        <p className="text-secondary-600">
          Extract tables from websites and PDFs, then export them to Excel files
        </p>
      </div>

      {/* Tabs - Only show if no tables scraped yet */}
      {tables.length === 0 && (
        <div className="border-b border-secondary-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('website')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'website'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
            >
              <Globe className="inline h-4 w-4 mr-2" />
              Website Scraping
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pdf'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
            >
              <FileText className="inline h-4 w-4 mr-2" />
              PDF Processing
            </button>
          </nav>
        </div>
      )}

      {/* Input Section - Only show if no tables scraped yet */}
      {tables.length === 0 && (
        <div className="space-y-6">
          {activeTab === 'website' ? (
            <form onSubmit={handleWebsiteScrape} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-secondary-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="input"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Scrape Tables
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="pdf-upload" className="block text-sm font-medium text-secondary-700 mb-2">
                  PDF File
                </label>
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  onChange={handlePDFUpload}
                  className="input"
                />
              </div>
              {uploadedFile && (
                <div className="text-sm text-secondary-600">
                  Selected: {uploadedFile.name}
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                <div className="text-sm text-green-700">{success}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Download Section - Show when tables are available */}
      {tables.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">
                Export Selected Tables
              </h3>
            </div>
            
            {/* Selected Tables List */}
            {selectedTables.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-secondary-700">Selected Tables ({selectedTables.length}):</h4>
                <div className="space-y-2">
                  {selectedTables.map((tableId) => {
                    const table = tables.find(t => t.id === tableId)
                    return table ? (
                      <div key={tableId} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-green-800">
                            Table {tables.findIndex(t => t.id === tableId) + 1}
                          </span>
                          <span className="text-sm text-green-600">
                            {table.rows} rows × {table.cols} columns
                          </span>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'TOGGLE_TABLE_SELECTION', payload: tableId })}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <CheckCircle className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">No tables selected for export</p>
                <p className="text-sm text-gray-500">Select tables from the list on the right to export them</p>
              </div>
            )}

            {/* Filename Input and Download Button */}
            <div className="space-y-4">
              <div>
                <label htmlFor="filename" className="block text-sm font-medium text-secondary-700 mb-2">
                  Excel Filename
                </label>
                <input
                  type="text"
                  id="filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="my_tables"
                  className="input"
                />
              </div>
              <button
                onClick={handleExport}
                disabled={selectedTables.length === 0 || loading || !filename.trim()}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {selectedTables.length} Selected Table{selectedTables.length !== 1 ? 's' : ''} to Excel
                  </>
                )}
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Section - Side by Side Layout */}
      {tables.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Webpage Viewer (for website scraping) */}
          <div className="space-y-4">
            {activeTab === 'website' && scrapedUrl && (
              <WebpageViewer 
                url={scrapedUrl}
                tables={tables}
                selectedTables={selectedTables}
                onToggleTable={(tableId) => dispatch({ type: 'TOGGLE_TABLE_SELECTION', payload: tableId })}
              />
            )}
          </div>

          {/* Right Side - Table List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">
                Found Tables ({tables.length})
              </h3>
              <button
                onClick={handleSelectAll}
                className="btn btn-outline text-sm"
              >
                {selectedTables.length === tables.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tables.map((table) => (
                <TablePreview
                  key={table.id}
                  table={table}
                  isSelected={selectedTables.includes(table.id)}
                  onToggle={() => handleTableToggle(table.id)}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default WebScrapingTool
