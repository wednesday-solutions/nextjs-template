import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import BackButton from '../index'

describe('<BackButton />', () => {
  it('should render the back button', () => {
    const { getByTestId } = renderProvider(<BackButton onClick={jest.fn()} />)
    expect(getByTestId('back-button')).toBeTruthy()
  })

  it('should call onClick when clicked', () => {
    const mockClick = jest.fn()
    const { getByTestId } = renderProvider(<BackButton onClick={mockClick} />)
    fireEvent.click(getByTestId('back-button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('should have accessible label', () => {
    const { getByLabelText } = renderProvider(
      <BackButton onClick={jest.fn()} />
    )
    expect(getByLabelText('Go back')).toBeTruthy()
  })
})
