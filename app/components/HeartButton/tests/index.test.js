import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import HeartButton from '../index'

describe('<HeartButton />', () => {
  const mockClick = jest.fn()

  beforeEach(() => {
    mockClick.mockClear()
  })

  it('should render with outline icon when not liked', () => {
    const { getByLabelText } = renderProvider(
      <HeartButton isLiked={false} onClick={mockClick} />
    )
    expect(getByLabelText('Like song')).toBeTruthy()
  })

  it('should render with filled icon when liked', () => {
    const { getByLabelText } = renderProvider(
      <HeartButton isLiked={true} onClick={mockClick} />
    )
    expect(getByLabelText('Unlike song')).toBeTruthy()
  })

  it('should call onClick when clicked', () => {
    const { getByTestId } = renderProvider(
      <HeartButton isLiked={false} onClick={mockClick} />
    )
    fireEvent.click(getByTestId('heart-button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('should stop event propagation on click', () => {
    const parentClick = jest.fn()
    const { getByTestId } = renderProvider(
      <div onClick={parentClick}>
        <HeartButton isLiked={false} onClick={mockClick} />
      </div>
    )
    fireEvent.click(getByTestId('heart-button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
    expect(parentClick).not.toHaveBeenCalled()
  })
})
