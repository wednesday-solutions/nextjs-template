import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@app/contexts/ThemeContext'
import ThemeToggle from '../index'

const renderWithTheme = (ui) => render(<ThemeProvider>{ui}</ThemeProvider>)

describe('<ThemeToggle />', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should render the toggle button', () => {
    const { getByTestId } = renderWithTheme(<ThemeToggle />)
    expect(getByTestId('theme-toggle')).toBeTruthy()
  })

  it('should have accessible label', () => {
    const { getByLabelText } = renderWithTheme(<ThemeToggle />)
    expect(getByLabelText('Switch to light theme')).toBeTruthy()
  })

  it('should switch label after click', () => {
    const { getByTestId, getByLabelText } = renderWithTheme(<ThemeToggle />)
    fireEvent.click(getByTestId('theme-toggle'))
    expect(getByLabelText('Switch to dark theme')).toBeTruthy()
  })
})
