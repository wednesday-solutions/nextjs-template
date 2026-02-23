import { renderHook, act } from '@testing-library/react'

const mockPlay = jest.fn().mockResolvedValue(undefined)
const mockPause = jest.fn()
let mockAudioInstance

jest.mock('../audioSingleton', () => ({
  getAudioInstance: () => mockAudioInstance
}))

const { useAudioPlayer } = require('../useAudioPlayer')

beforeEach(() => {
  mockPlay.mockClear()
  mockPause.mockClear()
  mockAudioInstance = {
    play: mockPlay,
    pause: mockPause,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    src: '',
    paused: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
})

describe('useAudioPlayer', () => {
  const song = { trackId: 1, previewUrl: 'http://test.mp3', trackName: 'Test' }

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAudioPlayer(null, jest.fn()))
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.volume).toBe(0.7)
    expect(result.current.currentTime).toBe(0)
    expect(result.current.duration).toBe(0)
  })

  it('should play when a new song is selected', () => {
    const { rerender } = renderHook(({ s }) => useAudioPlayer(s, jest.fn()), {
      initialProps: { s: null }
    })
    rerender({ s: song })
    expect(mockAudioInstance.src).toBe(song.previewUrl)
    expect(mockPlay).toHaveBeenCalled()
  })

  it('should not auto-play on remount with same song', () => {
    renderHook(() => useAudioPlayer(song, jest.fn()))
    expect(mockPlay).not.toHaveBeenCalled()
  })

  it('should toggle play/pause', () => {
    const { result, rerender } = renderHook(
      ({ s }) => useAudioPlayer(s, jest.fn()),
      {
        initialProps: { s: null }
      }
    )
    rerender({ s: song })
    act(() => {
      result.current.togglePlay()
    })
    expect(mockPause).toHaveBeenCalled()
  })

  it('should update volume', () => {
    const { result } = renderHook(() => useAudioPlayer(null, jest.fn()))
    act(() => {
      result.current.setVolume(0.5)
    })
    expect(result.current.volume).toBe(0.5)
    expect(mockAudioInstance.volume).toBe(0.5)
  })

  it('should seek to a given time', () => {
    const { result } = renderHook(() => useAudioPlayer(null, jest.fn()))
    act(() => {
      result.current.seek(15)
    })
    expect(mockAudioInstance.currentTime).toBe(15)
  })
})
