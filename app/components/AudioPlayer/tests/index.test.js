import React from 'react'
import { renderProvider } from '@utils/testUtils'
import AudioPlayer from '../index'

jest.mock('../useAudioPlayer', () => ({
  useAudioPlayer: () => ({
    isPlaying: false,
    currentTime: 0,
    duration: 30,
    volume: 0.7,
    togglePlay: jest.fn(),
    seek: jest.fn(),
    setVolume: jest.fn()
  })
}))

const mockSong = {
  trackId: 1,
  trackName: 'Test Song',
  artistName: 'Test Artist',
  artworkUrl: 'test.jpg',
  previewUrl: 'test.mp3'
}

describe('<AudioPlayer />', () => {
  const mockNext = jest.fn()
  const mockPrev = jest.fn()

  it('should render nothing when no currentSong', () => {
    const { container } = renderProvider(
      <AudioPlayer currentSong={null} onNext={mockNext} onPrev={mockPrev} />
    )
    expect(container.innerHTML).toBe('')
  })

  it('should render the player when a song is provided', () => {
    const { getByTestId } = renderProvider(
      <AudioPlayer currentSong={mockSong} onNext={mockNext} onPrev={mockPrev} />
    )
    expect(getByTestId('audio-player')).toBeTruthy()
  })

  it('should display track info', () => {
    const { getByText } = renderProvider(
      <AudioPlayer currentSong={mockSong} onNext={mockNext} onPrev={mockPrev} />
    )
    expect(getByText('Test Song')).toBeTruthy()
    expect(getByText('Test Artist')).toBeTruthy()
  })

  it('should render all control buttons', () => {
    const { getByTestId } = renderProvider(
      <AudioPlayer currentSong={mockSong} onNext={mockNext} onPrev={mockPrev} />
    )
    expect(getByTestId('prev-btn')).toBeTruthy()
    expect(getByTestId('play-btn')).toBeTruthy()
    expect(getByTestId('next-btn')).toBeTruthy()
  })

  it('should render progress and volume sliders', () => {
    const { getByTestId } = renderProvider(
      <AudioPlayer currentSong={mockSong} onNext={mockNext} onPrev={mockPrev} />
    )
    expect(getByTestId('progress-slider')).toBeTruthy()
    expect(getByTestId('volume-icon')).toBeTruthy()
    expect(getByTestId('volume-slider')).toBeTruthy()
  })
})
