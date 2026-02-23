import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import SearchBar from '../index'

describe('<SearchBar />', () => {
  const mockChange = jest.fn()
  const defaultProps = { value: '', onChange: mockChange, loading: false }

  beforeEach(() => {
    mockChange.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchBar {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the search input', () => {
    const { getByTestId } = renderProvider(<SearchBar {...defaultProps} />)
    expect(getByTestId('music-search-input')).toBeTruthy()
  })

  it('should call onChange when typing', () => {
    const { getByTestId } = renderProvider(<SearchBar {...defaultProps} />)
    fireEvent.change(getByTestId('music-search-input'), {
      target: { value: 'hello' }
    })
    expect(mockChange).toHaveBeenCalledWith('hello')
  })

  it('should not be disabled when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<SearchBar {...props} />)
    expect(getByTestId('music-search-input')).not.toBeDisabled()
  })
})
