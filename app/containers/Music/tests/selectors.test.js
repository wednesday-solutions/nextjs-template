import {
  selectMusicSongs,
  selectMusicLoading,
  selectMusicError,
  selectCurrentSong,
  selectSearchTerm
} from '../selectors'

describe('Music selector tests', () => {
  let mockedState

  beforeEach(() => {
    mockedState = {
      music: {
        songs: [{ trackId: 1, trackName: 'Test Song' }],
        loading: true,
        error: 'Some error',
        currentSong: { trackId: 1 },
        searchTerm: 'test'
      }
    }
  })

  it('should select songs', () => {
    expect(selectMusicSongs()(mockedState)).toEqual(mockedState.music.songs)
  })

  it('should select loading', () => {
    expect(selectMusicLoading()(mockedState)).toBe(true)
  })

  it('should select error', () => {
    expect(selectMusicError()(mockedState)).toBe('Some error')
  })

  it('should select currentSong', () => {
    expect(selectCurrentSong()(mockedState)).toEqual({ trackId: 1 })
  })

  it('should select searchTerm', () => {
    expect(selectSearchTerm()(mockedState)).toBe('test')
  })

  it('should return defaults when music state is empty', () => {
    const empty = {}
    expect(selectMusicSongs()(empty)).toEqual([])
    expect(selectMusicLoading()(empty)).toBe(false)
    expect(selectMusicError()(empty)).toBeNull()
    expect(selectCurrentSong()(empty)).toBeNull()
    expect(selectSearchTerm()(empty)).toBe('')
  })
})
