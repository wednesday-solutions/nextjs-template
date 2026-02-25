import { renderHook, act } from '@testing-library/react'
import useToggleLike from '../useToggleLike'

const mockSong = { trackId: 1, trackName: 'Song A' }

describe('useToggleLike', () => {
  const mockLike = jest.fn()
  const mockUnlike = jest.fn()

  beforeEach(() => {
    mockLike.mockClear()
    mockUnlike.mockClear()
  })

  it('should call dispatchLike for an unliked song', () => {
    const { result } = renderHook(() =>
      useToggleLike({
        likedTrackIds: {},
        dispatchLike: mockLike,
        dispatchUnlike: mockUnlike
      })
    )
    act(() => result.current(mockSong))
    expect(mockLike).toHaveBeenCalledWith(mockSong)
    expect(mockUnlike).not.toHaveBeenCalled()
  })

  it('should call dispatchUnlike for a liked song', () => {
    const { result } = renderHook(() =>
      useToggleLike({
        likedTrackIds: { 1: true },
        dispatchLike: mockLike,
        dispatchUnlike: mockUnlike
      })
    )
    act(() => result.current(mockSong))
    expect(mockUnlike).toHaveBeenCalledWith(1)
    expect(mockLike).not.toHaveBeenCalled()
  })
})
