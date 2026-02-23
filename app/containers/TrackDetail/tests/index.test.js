import React from 'react'
import { renderProvider } from '@utils/testUtils'
import { TrackDetailTest as TrackDetail } from '../index'

const mockBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { trackId: '123' }, back: mockBack })
}))

jest.mock('@components/AudioPlayer', () => {
  const Mock = () => <div data-testid='audio-player' />
  Mock.displayName = 'MockAudioPlayer'
  return Mock
})

jest.mock('@components/TrackInfo', () => {
  const PT = require('prop-types')
  const Mock = ({ track }) => (
    <div data-testid='track-info'>{track.trackName}</div>
  )
  Mock.displayName = 'MockTrackInfo'
  Mock.propTypes = { track: PT.object }
  return Mock
})

const mockTrack = {
  trackId: 123,
  trackName: 'Test Song',
  artistName: 'Test Artist',
  albumName: 'Test Album',
  artworkUrl: 'art.jpg'
}

describe('<TrackDetail /> container', () => {
  const mockFetch = jest.fn()
  const mockSetSong = jest.fn()
  const mockSetIsPlaying = jest.fn()
  const defaultProps = {
    trackData: null,
    loading: false,
    error: null,
    currentSong: null,
    dispatchFetchTrack: mockFetch,
    dispatchSetSong: mockSetSong,
    dispatchSetIsPlaying: mockSetIsPlaying
  }

  beforeEach(() => jest.clearAllMocks())

  it('should fetch track on mount', () => {
    renderProvider(<TrackDetail {...defaultProps} />)
    expect(mockFetch).toHaveBeenCalledWith(123)
  })

  it('should show loading spinner', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<TrackDetail {...props} />)
    expect(getByTestId('loading-spinner')).toBeTruthy()
  })

  it('should show error state', () => {
    const props = { ...defaultProps, error: 'Not found' }
    const { getByTestId } = renderProvider(<TrackDetail {...props} />)
    expect(getByTestId('error-state')).toBeTruthy()
  })

  it('should render track info when data loaded', () => {
    const props = { ...defaultProps, trackData: mockTrack }
    const { getByTestId } = renderProvider(<TrackDetail {...props} />)
    expect(getByTestId('track-info')).toBeTruthy()
  })

  it('should render back button', () => {
    const { getByTestId } = renderProvider(<TrackDetail {...defaultProps} />)
    expect(getByTestId('back-button')).toBeTruthy()
  })

  it('should render page title', () => {
    const { getByText } = renderProvider(<TrackDetail {...defaultProps} />)
    expect(getByText('MUSICA')).toBeTruthy()
  })
})
