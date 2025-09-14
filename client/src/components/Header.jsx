import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

function Header() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Digital Toolbox
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  Modern Programming Tools
                </div>
              </div>
            </button>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={handleLogoClick}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/web-scraping')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Web Scraping
              </button>
            </nav>
          </div>

          {/* Right side - Future actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500">
                Ready to extract data
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
