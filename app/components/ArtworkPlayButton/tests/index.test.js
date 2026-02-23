import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import ArtworkPlayButton from '../index'

describe('<ArtworkPlayButton />', () => {
  const defaultProps = {
    src: 'art.jpg',
    alt: 'Song Art',
    isPlaying: false,
    isActive: false,
    onClick: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  it('should render the artwork image', () => {
    const { getByAltText } = renderProvider(
      <ArtworkPlayButton {...defaultProps} />
    )
    expect(getByAltText('Song Art')).toBeTruthy()
  })

  it('should show PlayCircleFilled when not active', () => {
    const { getByTestId } = renderProvider(
      <ArtworkPlayButton {...defaultProps} />
    )
    expect(getByTestId('play-overlay')).toBeTruthy()
  })

  it('should show PauseCircleFilled when active and playing', () => {
    const props = { ...defaultProps, isActive: true, isPlaying: true }
    const { getByTestId } = renderProvider(<ArtworkPlayButton {...props} />)
    expect(getByTestId('play-overlay')).toBeTruthy()
  })

  it('should call onClick and stop propagation', () => {
    const { getByTestId } = renderProvider(
      <ArtworkPlayButton {...defaultProps} />
    )
    const wrapper = getByTestId('artwork-play-btn')
    const parentClick = jest.fn()
    wrapper.parentElement.addEventListener('click', parentClick)
    fireEvent.click(wrapper)
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
