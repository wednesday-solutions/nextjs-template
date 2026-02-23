import { PAYLOAD } from '@app/utils/reducer'
import { authReducer, initialState, authTypes } from '../reducer'

describe('Auth reducer tests', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(state)
  })

  it('should set loading to true when REQUEST_LOGIN is dispatched', () => {
    const expectedResult = { ...state, loading: true, error: null }
    expect(
      authReducer(state, {
        type: authTypes.REQUEST_LOGIN,
        email: 'test@test.com',
        password: 'password123'
      })
    ).toEqual(expectedResult)
  })

  it('should set loading to true when REQUEST_SIGNUP is dispatched', () => {
    const expectedResult = { ...state, loading: true, error: null }
    expect(
      authReducer(state, {
        type: authTypes.REQUEST_SIGNUP,
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123'
      })
    ).toEqual(expectedResult)
  })

  it('should set data when SUCCESS_AUTH is dispatched', () => {
    const data = { token: 'abc123', user: { name: 'Test' } }
    const expectedResult = { ...state, data, loading: false }
    expect(authReducer(state, { type: authTypes.SUCCESS_AUTH, data })).toEqual(
      expectedResult
    )
  })

  it('should set error when FAILURE_AUTH is dispatched', () => {
    const expectedResult = {
      ...state,
      [PAYLOAD.ERROR]: 'something_went_wrong',
      loading: false
    }
    expect(authReducer(state, { type: authTypes.FAILURE_AUTH })).toEqual(
      expectedResult
    )
  })

  it('should reset state when CLEAR_AUTH is dispatched', () => {
    const modifiedState = { ...state, data: { token: 'abc' }, loading: true }
    expect(authReducer(modifiedState, { type: authTypes.CLEAR_AUTH })).toEqual(
      initialState
    )
  })
})
