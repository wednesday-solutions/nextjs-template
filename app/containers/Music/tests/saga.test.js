import { takeLatest, call, put } from 'redux-saga/effects'
import { searchSongs } from '@services/musicApi'
import { apiResponseGenerator } from '@utils/testUtils'
import musicSaga, { handleSearchSongs } from '../saga'
import { musicTypes } from '../reducer'
import { MUSIC_PAYLOAD } from '../constants'

describe('Music saga tests', () => {
  const generator = musicSaga()

  it('should watch for REQUEST_SEARCH_SONGS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(musicTypes.REQUEST_SEARCH_SONGS, handleSearchSongs)
    )
  })

  describe('handleSearchSongs', () => {
    const action = { [MUSIC_PAYLOAD.SEARCH_TERM]: 'senorita' }

    it('should dispatch SUCCESS on successful search', () => {
      const gen = handleSearchSongs(action)
      expect(gen.next().value).toEqual(call(searchSongs, 'senorita'))
      const songs = [{ trackId: 1, trackName: 'Señorita' }]
      expect(gen.next(apiResponseGenerator(true, songs)).value).toEqual(
        put({ type: musicTypes.SUCCESS_SEARCH_SONGS, data: songs })
      )
    })

    it('should dispatch FAILURE on failed search', () => {
      const gen = handleSearchSongs(action)
      gen.next()
      const errorData = { message: 'Search failed' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: musicTypes.FAILURE_SEARCH_SONGS, error: errorData })
      )
    })
  })
})
