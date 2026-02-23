import { getStoredTheme, setStoredTheme } from '../themeStorage'

describe('themeStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should return null when no theme is stored', () => {
    expect(getStoredTheme()).toBeNull()
  })

  it('should store and retrieve a theme', () => {
    setStoredTheme('light')
    expect(getStoredTheme()).toBe('light')
  })

  it('should overwrite an existing theme', () => {
    setStoredTheme('dark')
    setStoredTheme('light')
    expect(getStoredTheme()).toBe('light')
  })
})
