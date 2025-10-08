import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Context shape
const ThemeContext = createContext({
  theme: 'light',
  setTheme: (t) => { },
  toggleTheme: () => { },
  resolvedTheme: 'light'
})

/**
 * ThemeProvider
 * - Persists user preference in localStorage (key: app-theme)
 * - Defaults to light if no stored preference (was previously system)
 * - If consumer deliberately passes defaultTheme="system" it will still honor system preference
 * - Adds/removes the `dark` class on <html>
 */
export function ThemeProvider({ children, defaultTheme = 'light', storageKey = 'app-theme' }) {
  const getSystemPreference = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) return stored
    } catch { }
    if (defaultTheme === 'system') return getSystemPreference()
    return defaultTheme
  })

  const applyThemeClass = useCallback(
    (t) => {
      const root = document.documentElement
      if (t === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
    },
    []
  )

  // Apply on mount & when theme changes
  useEffect(() => {
    applyThemeClass(theme)
  }, [theme, applyThemeClass])

  // Listen for system changes if user selected system
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const sys = getSystemPreference()
      applyThemeClass(sys)
    }
    try { mq.addEventListener('change', handler) } catch { mq.addListener(handler) }
    return () => {
      try { mq.removeEventListener('change', handler) } catch { mq.removeListener(handler) }
    }
  }, [theme, applyThemeClass])

  const setTheme = useCallback(
    (value) => {
      setThemeState(value)
      try { localStorage.setItem(storageKey, value) } catch { }
      if (value === 'system') {
        applyThemeClass(getSystemPreference())
      }
    },
    [applyThemeClass]
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const resolvedTheme = theme === 'system' ? getSystemPreference() : theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
