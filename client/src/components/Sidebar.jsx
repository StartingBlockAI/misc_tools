import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Globe, FileText, BarChart3, Settings, Home } from 'lucide-react'
import { useTool } from '../context/ToolContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, current: false },
  { name: 'Web Scraping', href: '/web-scraping', icon: Globe, current: false },
  { name: 'Data Analysis', href: '/data-analysis', icon: BarChart3, current: false, comingSoon: true },
  { name: 'File Converter', href: '/file-converter', icon: FileText, current: false, comingSoon: true },
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { dispatch } = useTool()

  const handleToolSelect = (toolName) => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-secondary-900 bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-secondary-900">Tools</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.comingSoon ? '#' : item.href}
                    onClick={() => !item.comingSoon && handleToolSelect(item.name)}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900'
                      }
                      ${item.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <Icon className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      ${isActive ? 'text-primary-500' : 'text-secondary-400 group-hover:text-secondary-500'}
                    `} />
                    {item.name}
                    {item.comingSoon && (
                      <span className="ml-auto text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-full">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-200">
          <div className="text-xs text-secondary-500 text-center">
            Digital Toolbox v1.0.0
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
