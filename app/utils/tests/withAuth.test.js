import React from 'react'
import { render } from '@testing-library/react'
import withAuth from '../withAuth'
import * as authStorage from '../authStorage'

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({ replace: mockReplace })
}))

describe('withAuth HOC', () => {
  const TestComponent = () => (
    <div data-testid='protected'>Protected Content</div>
  )
  const WrappedComponent = withAuth(TestComponent)

  beforeEach(() => {
    mockReplace.mockClear()
  })

  it('should render the wrapped component when token exists', () => {
    jest.spyOn(authStorage, 'getStoredToken').mockReturnValue('valid-token')
    const { getByTestId } = render(<WrappedComponent />)
    expect(getByTestId('protected')).toBeTruthy()
    authStorage.getStoredToken.mockRestore()
  })

  it('should redirect to /login when no token exists', () => {
    jest.spyOn(authStorage, 'getStoredToken').mockReturnValue(null)
    const { queryByTestId } = render(<WrappedComponent />)
    expect(queryByTestId('protected')).toBeNull()
    expect(mockReplace).toHaveBeenCalledWith('/login')
    authStorage.getStoredToken.mockRestore()
  })

  it('should set the correct displayName', () => {
    expect(WrappedComponent.displayName).toBe('withAuth(TestComponent)')
  })
})
