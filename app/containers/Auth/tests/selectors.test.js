import {
  selectAuthData,
  selectAuthError,
  selectAuthLoading
} from '../selectors'

describe('Auth selector tests', () => {
  let mockedState
  let authData
  let authError

  beforeEach(() => {
    authData = { token: 'abc123', user: { name: 'Test' } }
    authError = 'Invalid credentials'

    mockedState = {
      auth: {
        data: authData,
        error: authError,
        loading: true
      }
    }
  })

  it('should select auth data', () => {
    const dataSelector = selectAuthData()
    expect(dataSelector(mockedState)).toEqual(authData)
  })

  it('should select auth error', () => {
    const errorSelector = selectAuthError()
    expect(errorSelector(mockedState)).toEqual(authError)
  })

  it('should select auth loading', () => {
    const loadingSelector = selectAuthLoading()
    expect(loadingSelector(mockedState)).toEqual(true)
  })

  it('should return defaults when auth state is empty', () => {
    const emptyState = {}
    expect(selectAuthData()(emptyState)).toBeNull()
    expect(selectAuthError()(emptyState)).toBeNull()
    expect(selectAuthLoading()(emptyState)).toBe(false)
  })
})
