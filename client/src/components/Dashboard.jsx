import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, FileText, BarChart3, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const tools = [
  {
    name: 'Web Scraping Tool',
    description: 'Extract tables from websites and PDFs, then export to Excel',
    icon: Globe,
    href: '/web-scraping',
    status: 'available',
    features: ['Website table extraction', 'PDF table extraction', 'Excel export', 'Table preview']
  },
  {
    name: 'Data Analysis Tool',
    description: 'Analyze and visualize data with statistical insights',
    icon: BarChart3,
    href: '#',
    status: 'coming-soon',
    features: ['Statistical analysis', 'Data visualization', 'Report generation']
  },
  {
    name: 'File Converter Tool',
    description: 'Convert between different file formats seamlessly',
    icon: FileText,
    href: '#',
    status: 'coming-soon',
    features: ['Multiple format support', 'Batch conversion', 'Quality preservation']
  }
]

function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Tools for
            <span className="text-blue-600"> Modern Developers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Extract, analyze, and transform data with our collection of intuitive programming tools. 
            Built for developers who value efficiency and simplicity.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/web-scraping"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Scraping
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isAvailable = tool.status === 'available'
          
          return (
            <div
              key={tool.name}
              className={`
                bg-white rounded-xl border border-gray-200 p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${isAvailable ? 'hover:border-blue-300 cursor-pointer' : 'opacity-60'}
              `}
            >
              <Link to={isAvailable ? tool.href : '#'} className="block">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {isAvailable ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Available</span>
                      </div>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Key Features</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {isAvailable && (
                  <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Link>
            </div>
          )
        })}
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our tools are designed to be intuitive and powerful. Here's how to get the most out of them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Tool</h3>
            <p className="text-gray-600 leading-relaxed">
              Select from our growing collection of specialized programming tools designed for modern workflows.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Input Your Data</h3>
            <p className="text-gray-600 leading-relaxed">
              Provide your data source - whether it's a website URL, file upload, or direct input.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Export & Use</h3>
            <p className="text-gray-600 leading-relaxed">
              Download your processed data in various formats and integrate it into your projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
