import {
  selectTrackData,
  selectTrackDetailLoading,
  selectTrackDetailError
} from '../selectors'

describe('TrackDetail selector tests', () => {
  const mockedState = {
    trackDetail: {
      trackData: { trackId: 1, trackName: 'Test' },
      loading: true,
      error: 'Some error'
    }
  }

  it('should select trackData', () => {
    expect(selectTrackData()(mockedState)).toEqual({
      trackId: 1,
      trackName: 'Test'
    })
  })

  it('should select loading', () => {
    expect(selectTrackDetailLoading()(mockedState)).toBe(true)
  })

  it('should select error', () => {
    expect(selectTrackDetailError()(mockedState)).toBe('Some error')
  })

  it('should return defaults when trackDetail state is empty', () => {
    const empty = {}
    expect(selectTrackData()(empty)).toBeNull()
    expect(selectTrackDetailLoading()(empty)).toBe(false)
    expect(selectTrackDetailError()(empty)).toBeNull()
  })
})
