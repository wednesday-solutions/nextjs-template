import { takeLatest, call, put } from 'redux-saga/effects'
import { loginUser, signupUser } from '@services/authApi'
import { apiResponseGenerator } from '@utils/testUtils'
import authSaga, { handleLogin, handleSignup } from '../saga'
import { authTypes } from '../reducer'

describe('Auth saga tests', () => {
  const generator = authSaga()

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
      const res = gen.next().value
      expect(res).toEqual(
        call(loginUser, { email: action.email, password: action.password })
      )
      const successData = { token: 'abc123' }
      expect(gen.next(apiResponseGenerator(true, successData)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data: successData })
      )
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
    const action = { name: 'Test', email: 'test@test.com', password: 'pass123' }

    it('should dispatch SUCCESS_AUTH on successful signup', () => {
      const gen = handleSignup(action)
      const res = gen.next().value
      expect(res).toEqual(
        call(signupUser, {
          name: action.name,
          email: action.email,
          password: action.password
        })
      )
      const successData = { token: 'abc123' }
      expect(gen.next(apiResponseGenerator(true, successData)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data: successData })
      )
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
