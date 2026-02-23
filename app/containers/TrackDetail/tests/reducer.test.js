import { PAYLOAD } from '@app/utils/reducer'
import { trackDetailReducer, initialState, trackDetailTypes } from '../reducer'

describe('TrackDetail reducer tests', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(trackDetailReducer(undefined, {})).toEqual(state)
  })

  it('should set loading on REQUEST_TRACK_DETAIL', () => {
    const expected = { ...state, loading: true, error: null }
    expect(
      trackDetailReducer(state, {
        type: trackDetailTypes.REQUEST_TRACK_DETAIL,
        trackId: 123
      })
    ).toEqual(expected)
  })

  it('should set trackData on SUCCESS_TRACK_DETAIL', () => {
    const trackData = { trackId: 123, trackName: 'Test' }
    const expected = { ...state, trackData, loading: false }
    expect(
      trackDetailReducer(
        { ...state, loading: true },
        {
          type: trackDetailTypes.SUCCESS_TRACK_DETAIL,
          [PAYLOAD.DATA]: trackData
        }
      )
    ).toEqual(expected)
  })

  it('should set error on FAILURE_TRACK_DETAIL', () => {
    const expected = { ...state, error: 'something_went_wrong', loading: false }
    expect(
      trackDetailReducer(
        { ...state, loading: true },
        { type: trackDetailTypes.FAILURE_TRACK_DETAIL }
      )
    ).toEqual(expected)
  })

  it('should reset state on CLEAR_TRACK_DETAIL', () => {
    const modified = { ...state, trackData: { trackId: 1 }, loading: true }
    expect(
      trackDetailReducer(modified, {
        type: trackDetailTypes.CLEAR_TRACK_DETAIL
      })
    ).toEqual(initialState)
  })
})
