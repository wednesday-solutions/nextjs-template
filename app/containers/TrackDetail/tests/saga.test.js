import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchTrackDetails } from '@services/musicApi'
import { apiResponseGenerator } from '@utils/testUtils'
import trackDetailSaga, { handleFetchTrackDetail } from '../saga'
import { trackDetailTypes } from '../reducer'
import { TRACK_DETAIL_PAYLOAD } from '../constants'

describe('TrackDetail saga tests', () => {
  const generator = trackDetailSaga()

  it('should watch for REQUEST_TRACK_DETAIL action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(trackDetailTypes.REQUEST_TRACK_DETAIL, handleFetchTrackDetail)
    )
  })

  describe('handleFetchTrackDetail', () => {
    const action = { [TRACK_DETAIL_PAYLOAD.TRACK_ID]: 123 }

    it('should dispatch SUCCESS on successful fetch', () => {
      const gen = handleFetchTrackDetail(action)
      expect(gen.next().value).toEqual(call(fetchTrackDetails, 123))
      const track = { trackId: 123, trackName: 'Test Song' }
      expect(gen.next(apiResponseGenerator(true, track)).value).toEqual(
        put({ type: trackDetailTypes.SUCCESS_TRACK_DETAIL, data: track })
      )
    })

    it('should dispatch FAILURE on failed fetch', () => {
      const gen = handleFetchTrackDetail(action)
      gen.next()
      const errorData = { message: 'Not found' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: trackDetailTypes.FAILURE_TRACK_DETAIL, error: errorData })
      )
    })
  })
})
