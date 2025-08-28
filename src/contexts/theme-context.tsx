"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

interface ThemeSettings {
  hero: {
    title: string
    subtitle: string
    description: string
    button1Text: string
    button2Text: string
    backgroundImage: string
  }
  services: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      features: string[]
    }>
  }
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
    address: string
  }
  footer: {
    logo: string
    description: string
    email: string
    phone: string
    address: string
  }
  custom: {
    css: string
    js: string
  }
}

interface Theme {
  _id: string
  userId: string
  themeId: string
  name: string
  isActive: boolean
  isPublished: boolean
  publishedUrl: string
  settings: ThemeSettings
  lastEdited: string
  version: number
  views: number
  lastViewed: string | null
  createdAt: string
  updatedAt: string
}

interface ThemeState {
  themes: Theme[]
  activeTheme: Theme | null
  loading: boolean
  error: string | null
}

type ThemeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEMES'; payload: Theme[] }
  | { type: 'SET_ACTIVE_THEME'; payload: Theme | null }
  | { type: 'UPDATE_THEME'; payload: Theme }
  | { type: 'ADD_THEME'; payload: Theme }
  | { type: 'DELETE_THEME'; payload: string }
  | { type: 'UPDATE_THEME_SETTINGS'; payload: { themeId: string; settings: Partial<ThemeSettings> } }

const initialState: ThemeState = {
  themes: [],
  activeTheme: null,
  loading: false,
  error: null,
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_THEMES':
      return { 
        ...state, 
        themes: action.payload,
        activeTheme: action.payload.find(theme => theme.isActive) || null
      }
    case 'SET_ACTIVE_THEME':
      return { ...state, activeTheme: action.payload }
    case 'UPDATE_THEME':
      return {
        ...state,
        themes: state.themes.map(theme => 
          theme._id === action.payload._id ? action.payload : theme
        ),
        activeTheme: state.activeTheme?._id === action.payload._id ? action.payload : state.activeTheme
      }
    case 'ADD_THEME':
      return {
        ...state,
        themes: [...state.themes, action.payload],
        activeTheme: action.payload.isActive ? action.payload : state.activeTheme
      }
    case 'DELETE_THEME':
      return {
        ...state,
        themes: state.themes.filter(theme => theme._id !== action.payload),
        activeTheme: state.activeTheme?._id === action.payload ? null : state.activeTheme
      }
    case 'UPDATE_THEME_SETTINGS':
      return {
        ...state,
        themes: state.themes.map(theme => 
          theme._id === action.payload.themeId 
            ? { ...theme, settings: { ...theme.settings, ...action.payload.settings } }
            : theme
        ),
        activeTheme: state.activeTheme?._id === action.payload.themeId
          ? { ...state.activeTheme, settings: { ...state.activeTheme.settings, ...action.payload.settings } }
          : state.activeTheme
      }
    default:
      return state
  }
}

interface ThemeContextType {
  state: ThemeState
  fetchThemes: () => Promise<void>
  createTheme: (themeId: string, name: string) => Promise<Theme | null>
  updateTheme: (themeId: string, updates: Partial<Theme>) => Promise<void>
  deleteTheme: (themeId: string) => Promise<void>
  updateThemeSettings: (themeId: string, settings: Partial<ThemeSettings>) => Promise<void>
  setActiveTheme: (themeId: string) => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)
  const { data: session } = useSession()

  const fetchThemes = async () => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch('/api/themes')
      if (!response.ok) {
        throw new Error('Temalar yüklenemedi')
      }

      const data = await response.json()
      dispatch({ type: 'SET_THEMES', payload: data.themes })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const createTheme = async (themeId: string, name: string): Promise<Theme | null> => {
    if (!session?.user?.id) return null

    try {
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, name }),
      })

      if (!response.ok) {
        throw new Error('Tema oluşturulamadı')
      }

      const data = await response.json()
      dispatch({ type: 'ADD_THEME', payload: data.theme })
      return data.theme
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
      return null
    }
  }

  const updateTheme = async (themeId: string, updates: Partial<Theme>) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Tema güncellenemedi')
      }

      const data = await response.json()
      dispatch({ type: 'UPDATE_THEME', payload: data.theme })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
    }
  }

  const deleteTheme = async (themeId: string) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Tema silinemedi')
      }

      dispatch({ type: 'DELETE_THEME', payload: themeId })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
    }
  }

  const updateThemeSettings = async (themeId: string, settings: Partial<ThemeSettings>) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })

      if (!response.ok) {
        throw new Error('Tema ayarları güncellenemedi')
      }

      const data = await response.json()
      dispatch({ type: 'UPDATE_THEME', payload: data.theme })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
    }
  }

  const setActiveTheme = async (themeId: string) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      })

      if (!response.ok) {
        throw new Error('Aktif tema ayarlanamadı')
      }

      const data = await response.json()
      dispatch({ type: 'UPDATE_THEME', payload: data.theme })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Bir hata oluştu' })
    }
  }

  // Session değiştiğinde temaları yükle
  useEffect(() => {
    if (session?.user?.id) {
      fetchThemes()
    }
  }, [session?.user?.id])

  const value: ThemeContextType = {
    state,
    fetchThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    updateThemeSettings,
    setActiveTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
