import React, { createContext, useContext, useReducer } from 'react'

const ToolContext = createContext()

const initialState = {
  selectedTool: 'web-scraping',
  tables: [],
  selectedTables: [],
  loading: false,
  error: null,
  success: null
}

function toolReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_SUCCESS':
      return { ...state, success: action.payload, loading: false }
    
    case 'SET_TABLES':
      return { ...state, tables: action.payload, selectedTables: [], error: null }
    
    case 'TOGGLE_TABLE_SELECTION':
      const tableId = action.payload
      const isSelected = state.selectedTables.includes(tableId)
      return {
        ...state,
        selectedTables: isSelected
          ? state.selectedTables.filter(id => id !== tableId)
          : [...state.selectedTables, tableId]
      }
    
    case 'SELECT_ALL_TABLES':
      return {
        ...state,
        selectedTables: state.tables.map(table => table.id)
      }
    
    case 'CLEAR_SELECTION':
      return { ...state, selectedTables: [] }
    
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, success: null }
    
    default:
      return state
  }
}

export function ToolProvider({ children }) {
  const [state, dispatch] = useReducer(toolReducer, initialState)

  const value = {
    ...state,
    dispatch
  }

  return (
    <ToolContext.Provider value={value}>
      {children}
    </ToolContext.Provider>
  )
}

export function useTool() {
  const context = useContext(ToolContext)
  if (!context) {
    throw new Error('useTool must be used within a ToolProvider')
  }
  return context
}
