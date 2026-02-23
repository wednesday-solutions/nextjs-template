import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../ThemeContext'

const TestConsumer = () => {
  const { themeMode, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid='mode'>{themeMode}</span>
      <button data-testid='toggle' onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should default to dark theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    expect(getByTestId('mode').textContent).toBe('dark')
  })

  it('should toggle from dark to light', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    fireEvent.click(getByTestId('toggle'))
    expect(getByTestId('mode').textContent).toBe('light')
  })

  it('should toggle back to dark', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    fireEvent.click(getByTestId('toggle'))
    fireEvent.click(getByTestId('toggle'))
    expect(getByTestId('mode').textContent).toBe('dark')
  })

  it('should persist theme to localStorage', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    fireEvent.click(getByTestId('toggle'))
    expect(window.localStorage.getItem('musica_theme')).toBe('light')
  })

  it('should read initial theme from localStorage', () => {
    window.localStorage.setItem('musica_theme', 'light')
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    expect(getByTestId('mode').textContent).toBe('light')
  })
})
