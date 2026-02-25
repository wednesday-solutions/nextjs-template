import {
  selectLikedSongs,
  selectLikedTrackIds,
  selectLibraryLoading,
  selectLibraryError
} from '../selectors'

describe('Library selectors', () => {
  const mockState = {
    library: {
      likedSongs: [{ trackId: 1 }],
      likedTrackIds: { 1: true },
      loading: true,
      error: 'oops'
    }
  }

  it('should select liked songs', () => {
    expect(selectLikedSongs()(mockState)).toEqual([{ trackId: 1 }])
  })

  it('should select liked track ids', () => {
    expect(selectLikedTrackIds()(mockState)).toEqual({ 1: true })
  })

  it('should select loading state', () => {
    expect(selectLibraryLoading()(mockState)).toBe(true)
  })

  it('should select error state', () => {
    expect(selectLibraryError()(mockState)).toBe('oops')
  })

  it('should return defaults when library state is missing', () => {
    const empty = {}
    expect(selectLikedSongs()(empty)).toEqual([])
    expect(selectLikedTrackIds()(empty)).toEqual({})
    expect(selectLibraryLoading()(empty)).toBe(false)
    expect(selectLibraryError()(empty)).toBeNull()
  })
})
