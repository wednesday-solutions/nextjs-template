import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchLibrary, likeSong, unlikeSong } from '@services/libraryApi'
import { apiResponseGenerator } from '@utils/testUtils'
import librarySaga, {
  handleFetchLibrary,
  handleLikeSong,
  handleUnlikeSong
} from '../saga'
import { libraryTypes } from '../reducer'

const mockSong = { trackId: 1, trackName: 'Song A', artistName: 'Artist A' }

describe('Library saga tests', () => {
  const generator = librarySaga()

  it('should watch for REQUEST_FETCH_LIBRARY', () => {
    expect(generator.next().value).toEqual(
      takeLatest(libraryTypes.REQUEST_FETCH_LIBRARY, handleFetchLibrary)
    )
  })

  it('should watch for REQUEST_LIKE_SONG', () => {
    expect(generator.next().value).toEqual(
      takeLatest(libraryTypes.REQUEST_LIKE_SONG, handleLikeSong)
    )
  })

  it('should watch for REQUEST_UNLIKE_SONG', () => {
    expect(generator.next().value).toEqual(
      takeLatest(libraryTypes.REQUEST_UNLIKE_SONG, handleUnlikeSong)
    )
  })

  describe('handleFetchLibrary', () => {
    it('should dispatch SUCCESS on success', () => {
      const gen = handleFetchLibrary()
      expect(gen.next().value).toEqual(call(fetchLibrary))
      const data = [mockSong]
      expect(gen.next(apiResponseGenerator(true, data)).value).toEqual(
        put({ type: libraryTypes.SUCCESS_FETCH_LIBRARY, data })
      )
    })

    it('should dispatch FAILURE on error', () => {
      const gen = handleFetchLibrary()
      gen.next()
      const error = { message: 'fail' }
      expect(gen.next(apiResponseGenerator(false, error)).value).toEqual(
        put({ type: libraryTypes.FAILURE_FETCH_LIBRARY, error })
      )
    })
  })

  describe('handleLikeSong', () => {
    const action = { songData: mockSong }

    it('should dispatch SUCCESS on success', () => {
      const gen = handleLikeSong(action)
      expect(gen.next().value).toEqual(call(likeSong, mockSong))
      expect(gen.next(apiResponseGenerator(true, {})).value).toEqual(
        put({ type: libraryTypes.SUCCESS_LIKE_SONG, songData: mockSong })
      )
    })

    it('should dispatch FAILURE on error', () => {
      const gen = handleLikeSong(action)
      gen.next()
      const error = { message: 'fail' }
      expect(gen.next(apiResponseGenerator(false, error)).value).toEqual(
        put({ type: libraryTypes.FAILURE_LIKE_SONG, error })
      )
    })
  })

  describe('handleUnlikeSong', () => {
    const action = { trackId: 1 }

    it('should dispatch SUCCESS on success', () => {
      const gen = handleUnlikeSong(action)
      expect(gen.next().value).toEqual(call(unlikeSong, 1))
      expect(gen.next(apiResponseGenerator(true, {})).value).toEqual(
        put({ type: libraryTypes.SUCCESS_UNLIKE_SONG, trackId: 1 })
      )
    })

    it('should dispatch FAILURE on error', () => {
      const gen = handleUnlikeSong(action)
      gen.next()
      const error = { message: 'fail' }
      expect(gen.next(apiResponseGenerator(false, error)).value).toEqual(
        put({ type: libraryTypes.FAILURE_UNLIKE_SONG, error })
      )
    })
  })
})
