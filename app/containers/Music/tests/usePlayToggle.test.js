import { renderHook, act } from '@testing-library/react'
import usePlayToggle from '../usePlayToggle'

describe('usePlayToggle hook', () => {
  const mockSetSong = jest.fn()
  const currentSong = { trackId: 1, trackName: 'Song A' }

  beforeEach(() => jest.clearAllMocks())

  it('should call dispatchSetSong for a different song', () => {
    const { result } = renderHook(() =>
      usePlayToggle({ currentSong, dispatchSetSong: mockSetSong })
    )
    const otherSong = { trackId: 2, trackName: 'Song B' }
    act(() => result.current.handlePlayToggle(otherSong))
    expect(mockSetSong).toHaveBeenCalledWith(otherSong)
  })

  it('should call togglePlay for the same song', () => {
    const mockToggle = jest.fn()
    const { result } = renderHook(() =>
      usePlayToggle({ currentSong, dispatchSetSong: mockSetSong })
    )
    act(() => result.current.registerTogglePlay(mockToggle))
    act(() => result.current.handlePlayToggle(currentSong))
    expect(mockToggle).toHaveBeenCalledTimes(1)
    expect(mockSetSong).not.toHaveBeenCalled()
  })

  it('should not crash if togglePlay not registered', () => {
    const { result } = renderHook(() =>
      usePlayToggle({ currentSong, dispatchSetSong: mockSetSong })
    )
    expect(() => {
      act(() => result.current.handlePlayToggle(currentSong))
    }).not.toThrow()
  })
})
