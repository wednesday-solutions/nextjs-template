import React from 'react'
import { renderProvider } from '@utils/testUtils'
import VerifyEmailPage from '../../../../pages/verify-email'

describe('<VerifyEmailPage />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<VerifyEmailPage />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should display the check inbox message', () => {
    const { getByText } = renderProvider(<VerifyEmailPage />)
    expect(getByText('Check your inbox')).toBeTruthy()
  })

  it('should show a link to sign in', () => {
    const { getByText } = renderProvider(<VerifyEmailPage />)
    expect(getByText('Sign in')).toBeTruthy()
  })
})
