import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import { clearStoredToken } from '@utils/authStorage'
import Router from 'next/router'
import LogoutButton from '../index'

jest.mock('@utils/authStorage', () => ({
  clearStoredToken: jest.fn()
}))

jest.mock('next/router', () => ({
  push: jest.fn()
}))

describe('<LogoutButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the logout button', () => {
    const { getByTestId } = renderProvider(<LogoutButton />)
    expect(getByTestId('logout-button')).toBeTruthy()
  })

  it('should have the correct aria-label', () => {
    const { getByLabelText } = renderProvider(<LogoutButton />)
    expect(getByLabelText('Log out')).toBeTruthy()
  })

  it('should clear token on click', () => {
    const { getByTestId } = renderProvider(<LogoutButton />)
    fireEvent.click(getByTestId('logout-button'))
    expect(clearStoredToken).toHaveBeenCalledTimes(1)
  })

  it('should redirect to login on click', () => {
    const { getByTestId } = renderProvider(<LogoutButton />)
    fireEvent.click(getByTestId('logout-button'))
    expect(Router.push).toHaveBeenCalledWith('/login')
  })
})
