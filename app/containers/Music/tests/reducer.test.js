import { PAYLOAD } from '@app/utils/reducer'
import { musicReducer, initialState, musicTypes } from '../reducer'
import { MUSIC_PAYLOAD } from '../constants'

describe('Music reducer tests', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(musicReducer(undefined, {})).toEqual(state)
  })

  it('should set loading and searchTerm on REQUEST_SEARCH_SONGS', () => {
    const expected = {
      ...state,
      loading: true,
      error: null,
      searchTerm: 'senorita'
    }
    expect(
      musicReducer(state, {
        type: musicTypes.REQUEST_SEARCH_SONGS,
        [MUSIC_PAYLOAD.SEARCH_TERM]: 'senorita'
      })
    ).toEqual(expected)
  })

  it('should set songs on SUCCESS_SEARCH_SONGS', () => {
    const songs = [{ trackId: 1, trackName: 'Song' }]
    const expected = { ...state, songs, loading: false }
    expect(
      musicReducer(state, {
        type: musicTypes.SUCCESS_SEARCH_SONGS,
        [PAYLOAD.DATA]: songs
      })
    ).toEqual(expected)
  })

  it('should set error on FAILURE_SEARCH_SONGS', () => {
    const expected = {
      ...state,
      [PAYLOAD.ERROR]: 'something_went_wrong',
      loading: false
    }
    expect(
      musicReducer(state, { type: musicTypes.FAILURE_SEARCH_SONGS })
    ).toEqual(expected)
  })

  it('should set currentSong on SET_CURRENT_SONG', () => {
    const song = { trackId: 1, trackName: 'Song' }
    const expected = { ...state, currentSong: song }
    expect(
      musicReducer(state, {
        type: musicTypes.SET_CURRENT_SONG,
        [MUSIC_PAYLOAD.CURRENT_SONG]: song
      })
    ).toEqual(expected)
  })

  it('should reset state on CLEAR_MUSIC', () => {
    const modified = { ...state, songs: [{ trackId: 1 }], loading: true }
    expect(musicReducer(modified, { type: musicTypes.CLEAR_MUSIC })).toEqual(
      initialState
    )
  })
})
