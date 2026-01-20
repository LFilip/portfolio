import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    // Reset to initial state
    useThemeStore.setState({ theme: 'light' })
    localStorage.clear()
  })

  it('should have default theme as light', () => {
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should toggle theme from light to dark', () => {
    useThemeStore.getState().toggleTheme()
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('dark')
  })

  it('should toggle theme from dark to light', () => {
    useThemeStore.setState({ theme: 'dark' })
    useThemeStore.getState().toggleTheme()
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should set theme directly with setTheme dark', () => {
    useThemeStore.getState().setTheme('dark')
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('dark')
  })

  it('should set theme directly with setTheme light', () => {
    useThemeStore.setState({ theme: 'dark' })
    useThemeStore.getState().setTheme('light')
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should persist theme to localStorage', () => {
    useThemeStore.getState().setTheme('dark')

    const stored = localStorage.getItem('theme-storage')
    expect(stored).toBeDefined()

    const parsed = JSON.parse(stored!)
    expect(parsed.state.theme).toBe('dark')
  })
})
