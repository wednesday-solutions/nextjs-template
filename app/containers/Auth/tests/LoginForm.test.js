import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import LoginForm from '../LoginForm'

describe('<LoginForm />', () => {
  const mockSubmit = jest.fn()
  const defaultProps = { onSubmit: mockSubmit, loading: false, error: null }

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LoginForm {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render email and password inputs', () => {
    const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
    expect(getByTestId('login-email')).toBeTruthy()
    expect(getByTestId('login-password')).toBeTruthy()
  })

  it('should call onSubmit with email and password', () => {
    const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
    fireEvent.change(getByTestId('login-email'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(getByTestId('login-password'), {
      target: { value: 'pass123' }
    })
    fireEvent.click(getByTestId('login-submit'))
    expect(mockSubmit).toHaveBeenCalledWith('test@test.com', 'pass123')
  })

  it('should display error message when error prop is set', () => {
    const props = { ...defaultProps, error: 'Invalid credentials' }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-error').textContent).toBe('Invalid credentials')
  })

  it('should disable submit button when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-submit')).toBeDisabled()
  })

  it('should show loading text when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-submit').textContent).toBe('Signing in...')
  })
})
