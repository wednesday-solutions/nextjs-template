import {
  getStoredToken,
  setStoredToken,
  clearStoredToken
} from '../authStorage'

describe('authStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should return null when no token is stored', () => {
    expect(getStoredToken()).toBeNull()
  })

  it('should store and retrieve a token', () => {
    setStoredToken('test-token-123')
    expect(getStoredToken()).toBe('test-token-123')
  })

  it('should clear the stored token', () => {
    setStoredToken('test-token-123')
    clearStoredToken()
    expect(getStoredToken()).toBeNull()
  })

  it('should overwrite an existing token', () => {
    setStoredToken('old-token')
    setStoredToken('new-token')
    expect(getStoredToken()).toBe('new-token')
  })
})
