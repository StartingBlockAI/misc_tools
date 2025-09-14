import React, { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react'

function TablePreview({ table, isSelected, onToggle }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [previewRows] = useState(5) // Show first 5 rows in preview

  const previewData = table.data.slice(0, previewRows)
  const hasMoreRows = table.data.length > previewRows

  return (
    <div className={`border rounded-lg bg-white transition-all duration-200 ${
      isSelected 
        ? 'border-green-300 bg-green-50 shadow-md' 
        : 'border-secondary-200 hover:border-primary-300'
    }`}>
      {/* Header */}
      <div 
        className="p-3 cursor-pointer hover:bg-secondary-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              className={`transition-all duration-200 ${
                isSelected 
                  ? 'text-green-600 hover:text-green-700' 
                  : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              {isSelected ? (
                <CheckCircle className="h-5 w-5 animate-pulse" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div>
              <h4 className="font-medium text-secondary-900 text-sm">{table.title}</h4>
              <p className="text-xs text-secondary-500">
                {table.rows} rows × {table.cols} columns
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isSelected && (
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                Selected
              </span>
            )}
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-secondary-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-secondary-400" />
            )}
          </div>
        </div>
      </div>

      {/* Table Preview */}
      {isExpanded && (
        <div className="border-t border-secondary-200 p-4">
          <div className="table-container">
            <table className="table">
              {table.headers && table.headers.length > 0 ? (
                <>
                  <thead>
                    <tr>
                      {table.headers.map((header, index) => (
                        <th key={index} className="text-left font-semibold bg-blue-50">
                          {header || `Column ${index + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="max-w-xs truncate">
                            {cell || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <tbody>
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="max-w-xs truncate">
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          
          {hasMoreRows && (
            <div className="mt-2 text-sm text-secondary-500 text-center">
              Showing {previewRows} of {table.data.length} rows
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TablePreview
