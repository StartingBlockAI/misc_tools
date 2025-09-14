import React, { useState, useRef } from 'react'
import { ExternalLink, Maximize2, Minimize2, AlertTriangle } from 'lucide-react'

function WebpageViewer({ url, tables, selectedTables, onToggleTable }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const iframeRef = useRef(null)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-secondary-900">
          Webpage Preview
        </h4>
        <div className="flex items-center space-x-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Original
          </a>
          <button
            onClick={toggleFullscreen}
            className="btn btn-outline text-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Iframe Container or Fallback */}
      <div className={`border border-secondary-200 rounded-lg overflow-hidden bg-white ${
        isFullscreen ? 'h-full' : 'h-96'
      }`}>
        {iframeError ? (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Webpage Preview Not Available
              </h3>
              <p className="text-gray-600 mb-4">
                Due to browser security restrictions, we cannot display this webpage directly.
                You can still select tables using the list below.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </a>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full"
            title="Webpage Preview"
            sandbox="allow-same-origin allow-scripts allow-forms"
            onError={() => setIframeError(true)}
          />
        )}
      </div>

      {/* Table Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900">{tables.length}</div>
          <div className="text-sm text-secondary-600">Tables Found</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{selectedTables.length}</div>
          <div className="text-sm text-green-600">Selected</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {tables.length - selectedTables.length}
          </div>
          <div className="text-sm text-blue-600">Available</div>
        </div>
      </div>
    </div>
  )
}

export default WebpageViewer