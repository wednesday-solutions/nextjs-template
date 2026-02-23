import { renderHook, act } from '@testing-library/react'
import usePlaybackNav from '../usePlaybackNav'

const songs = [
  { trackId: 1, trackName: 'A' },
  { trackId: 2, trackName: 'B' },
  { trackId: 3, trackName: 'C' }
]

describe('usePlaybackNav', () => {
  const mockSetSong = jest.fn()

  beforeEach(() => mockSetSong.mockClear())

  it('should go to next song', () => {
    const { result } = renderHook(() =>
      usePlaybackNav({
        songs,
        currentSong: songs[0],
        dispatchSetSong: mockSetSong
      })
    )
    act(() => result.current.handleNext())
    expect(mockSetSong).toHaveBeenCalledWith(songs[1])
  })

  it('should go to previous song', () => {
    const { result } = renderHook(() =>
      usePlaybackNav({
        songs,
        currentSong: songs[1],
        dispatchSetSong: mockSetSong
      })
    )
    act(() => result.current.handlePrev())
    expect(mockSetSong).toHaveBeenCalledWith(songs[0])
  })

  it('should not go past last song', () => {
    const { result } = renderHook(() =>
      usePlaybackNav({
        songs,
        currentSong: songs[2],
        dispatchSetSong: mockSetSong
      })
    )
    act(() => result.current.handleNext())
    expect(mockSetSong).not.toHaveBeenCalled()
  })

  it('should not go before first song', () => {
    const { result } = renderHook(() =>
      usePlaybackNav({
        songs,
        currentSong: songs[0],
        dispatchSetSong: mockSetSong
      })
    )
    act(() => result.current.handlePrev())
    expect(mockSetSong).not.toHaveBeenCalled()
  })
})
