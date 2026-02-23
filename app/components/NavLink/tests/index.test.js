import React from 'react'
import { renderProvider } from '@utils/testUtils'
import NavLink from '../index'

describe('<NavLink />', () => {
  it('should render the label text', () => {
    const { getByText } = renderProvider(<NavLink href='/' label='Search' />)
    expect(getByText('Search')).toBeTruthy()
  })

  it('should have the correct test id', () => {
    const { getByTestId } = renderProvider(
      <NavLink href='/library' label='Library' />
    )
    expect(getByTestId('nav-library')).toBeTruthy()
  })

  it('should render with active styling prop', () => {
    const { getByTestId } = renderProvider(
      <NavLink href='/' label='Search' isActive />
    )
    expect(getByTestId('nav-search')).toBeTruthy()
  })

  it('should link to the correct href', () => {
    const { getByTestId } = renderProvider(
      <NavLink href='/library' label='Library' />
    )
    expect(getByTestId('nav-library').getAttribute('href')).toBe('/library')
  })
})
