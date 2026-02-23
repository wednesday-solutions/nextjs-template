import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import SignupForm from '../SignupForm'

describe('<SignupForm />', () => {
  const mockSubmit = jest.fn()
  const defaultProps = { onSubmit: mockSubmit, loading: false, error: null }

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SignupForm {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render name, email, and password inputs', () => {
    const { getByTestId } = renderProvider(<SignupForm {...defaultProps} />)
    expect(getByTestId('signup-name')).toBeTruthy()
    expect(getByTestId('signup-email')).toBeTruthy()
    expect(getByTestId('signup-password')).toBeTruthy()
  })

  it('should call onSubmit with name, email, and password', () => {
    const { getByTestId } = renderProvider(<SignupForm {...defaultProps} />)
    fireEvent.change(getByTestId('signup-name'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(getByTestId('signup-email'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(getByTestId('signup-password'), {
      target: { value: 'pass123' }
    })
    fireEvent.click(getByTestId('signup-submit'))
    expect(mockSubmit).toHaveBeenCalledWith(
      'Test User',
      'test@test.com',
      'pass123'
    )
  })

  it('should display error message when error prop is set', () => {
    const props = { ...defaultProps, error: 'Email already exists' }
    const { getByTestId } = renderProvider(<SignupForm {...props} />)
    expect(getByTestId('signup-error').textContent).toBe('Email already exists')
  })

  it('should disable submit button when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<SignupForm {...props} />)
    expect(getByTestId('signup-submit')).toBeDisabled()
  })

  it('should show loading text when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<SignupForm {...props} />)
    expect(getByTestId('signup-submit').textContent).toBe('Creating account...')
  })
})
