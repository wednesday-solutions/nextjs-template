import {
  libraryReducer as reducer,
  initialState,
  libraryTypes
} from '../reducer'

const mockSong = {
  trackId: 1,
  trackName: 'Song A',
  artistName: 'Artist A',
  albumName: 'Album A',
  previewUrl: 'a.mp3',
  artworkUrl: 'a.jpg'
}

const mockSongB = {
  trackId: 2,
  trackName: 'Song B',
  artistName: 'Artist B',
  albumName: 'Album B',
  previewUrl: 'b.mp3',
  artworkUrl: 'b.jpg'
}

describe('Library reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle REQUEST_FETCH_LIBRARY', () => {
    const action = { type: libraryTypes.REQUEST_FETCH_LIBRARY }
    const state = reducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should handle SUCCESS_FETCH_LIBRARY', () => {
    const songs = [mockSong, mockSongB]
    const action = { type: libraryTypes.SUCCESS_FETCH_LIBRARY, data: songs }
    const state = reducer(initialState, action)
    expect(state.likedSongs).toEqual(songs)
    expect(state.likedTrackIds).toEqual({ 1: true, 2: true })
    expect(state.loading).toBe(false)
  })

  it('should handle FAILURE_FETCH_LIBRARY', () => {
    const action = { type: libraryTypes.FAILURE_FETCH_LIBRARY, error: 'fail' }
    const state = reducer(initialState, action)
    expect(state.error).toBe('fail')
    expect(state.loading).toBe(false)
  })

  it('should handle SUCCESS_LIKE_SONG', () => {
    const action = { type: libraryTypes.SUCCESS_LIKE_SONG, songData: mockSong }
    const state = reducer(initialState, action)
    expect(state.likedSongs).toEqual([mockSong])
    expect(state.likedTrackIds[1]).toBe(true)
  })

  it('should handle SUCCESS_UNLIKE_SONG', () => {
    const withSongs = {
      ...initialState,
      likedSongs: [mockSong, mockSongB],
      likedTrackIds: { 1: true, 2: true }
    }
    const action = { type: libraryTypes.SUCCESS_UNLIKE_SONG, trackId: 1 }
    const state = reducer(withSongs, action)
    expect(state.likedSongs).toEqual([mockSongB])
    expect(state.likedTrackIds[1]).toBeUndefined()
    expect(state.likedTrackIds[2]).toBe(true)
  })

  it('should handle CLEAR_LIBRARY', () => {
    const withSongs = {
      ...initialState,
      likedSongs: [mockSong],
      likedTrackIds: { 1: true }
    }
    const action = { type: libraryTypes.CLEAR_LIBRARY }
    const state = reducer(withSongs, action)
    expect(state).toEqual(initialState)
  })
})
