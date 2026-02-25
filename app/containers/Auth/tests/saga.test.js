import { takeLatest, call, put } from 'redux-saga/effects'
import Router from 'next/router'
import { loginUser, signupUser } from '@services/authApi'
import { apiResponseGenerator } from '@utils/testUtils'
import * as authStorage from '@utils/authStorage'
import authSaga, { handleLogin, handleSignup } from '../saga'
import { authTypes } from '../reducer'

jest.mock('next/router', () => ({ push: jest.fn() }))
jest.mock('@utils/authStorage')
jest.mock('@utils/apiUtils', () => ({
  ...jest.requireActual('@utils/apiUtils'),
  setAuthHeader: jest.fn()
}))

describe('Auth saga tests', () => {
  const generator = authSaga()

  beforeEach(() => {
    Router.push.mockClear()
    authStorage.setStoredToken.mockClear()
  })

  it('should watch for REQUEST_LOGIN action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(authTypes.REQUEST_LOGIN, handleLogin)
    )
  })

  it('should watch for REQUEST_SIGNUP action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(authTypes.REQUEST_SIGNUP, handleSignup)
    )
  })

  describe('handleLogin', () => {
    const action = { email: 'test@test.com', password: 'pass123' }

    it('should dispatch SUCCESS_AUTH on successful login', () => {
      const gen = handleLogin(action)
      expect(gen.next().value).toEqual(
        call(loginUser, { email: action.email, password: action.password })
      )
      const data = { accessToken: 'tok123' }
      expect(gen.next(apiResponseGenerator(true, data)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data })
      )
    })

    it('should persist token and redirect on success', () => {
      const gen = handleLogin(action)
      gen.next()
      const data = { accessToken: 'tok123' }
      gen.next(apiResponseGenerator(true, data))
      gen.next()
      expect(authStorage.setStoredToken).toHaveBeenCalledWith('tok123')
      expect(Router.push).toHaveBeenCalledWith('/')
    })

    it('should dispatch FAILURE_AUTH on failed login', () => {
      const gen = handleLogin(action)
      gen.next()
      const errorData = { message: 'Invalid credentials' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: authTypes.FAILURE_AUTH, error: errorData })
      )
    })
  })

  describe('handleSignup', () => {
    const action = { email: 'test@test.com', password: 'pass123' }

    it('should dispatch SUCCESS_AUTH on successful signup', () => {
      const gen = handleSignup(action)
      expect(gen.next().value).toEqual(
        call(signupUser, {
          email: action.email,
          password: action.password
        })
      )
      const data = { user: { userMetadata: { emailVerified: false } } }
      expect(gen.next(apiResponseGenerator(true, data)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data })
      )
    })

    it('should redirect to verify-email when not verified', () => {
      const gen = handleSignup(action)
      gen.next()
      const data = { user: { userMetadata: { emailVerified: false } } }
      gen.next(apiResponseGenerator(true, data))
      gen.next()
      expect(Router.push).toHaveBeenCalledWith('/verify-email')
    })

    it('should not redirect when user is verified', () => {
      const gen = handleSignup(action)
      gen.next()
      const data = { user: { userMetadata: { emailVerified: true } } }
      gen.next(apiResponseGenerator(true, data))
      gen.next()
      expect(Router.push).not.toHaveBeenCalled()
    })

    it('should dispatch FAILURE_AUTH on failed signup', () => {
      const gen = handleSignup(action)
      gen.next()
      const errorData = { message: 'Email already exists' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: authTypes.FAILURE_AUTH, error: errorData })
      )
    })
  })
})
