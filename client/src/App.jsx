import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import WebScrapingTool from './components/WebScrapingTool'
import Dashboard from './components/Dashboard'
import { ToolProvider } from './context/ToolContext'

function App() {
  return (
    <ToolProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/web-scraping" element={<WebScrapingTool />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToolProvider>
  )
}

export default App
