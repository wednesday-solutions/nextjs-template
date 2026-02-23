import React from 'react'
import { renderProvider } from '@utils/testUtils'
import { MusicTest as Music } from '../index'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush })
}))

jest.mock('@components/ThemeToggle', () => {
  const Mock = () => <div data-testid='theme-toggle' />
  Mock.displayName = 'MockThemeToggle'
  return Mock
})

jest.mock('@components/LogoutButton', () => {
  const Mock = () => <div data-testid='logout-button' />
  Mock.displayName = 'MockLogoutButton'
  return Mock
})

jest.mock('@components/NavLink', () => {
  const PT = require('prop-types')
  const Mock = ({ label }) => (
    <a data-testid={`nav-${label.toLowerCase()}`}>{label}</a>
  )
  Mock.displayName = 'MockNavLink'
  Mock.propTypes = { label: PT.string }
  return Mock
})

jest.mock('@components/AudioPlayer', () => {
  const Mock = () => <div data-testid='audio-player' />
  Mock.displayName = 'MockAudioPlayer'
  return Mock
})

jest.mock('@components/ArtworkPlayButton', () => {
  const PT = require('prop-types')
  const Mock = ({ onClick }) => (
    <button data-testid='artwork-play-btn' onClick={onClick}>
      play
    </button>
  )
  Mock.displayName = 'MockArtworkPlayButton'
  Mock.propTypes = { onClick: PT.func }
  return Mock
})

const mockSongs = [
  {
    trackId: 1,
    trackName: 'Song A',
    artistName: 'Artist A',
    artworkUrl: 'a.jpg',
    previewUrl: 'a.mp3',
    albumName: 'Album A'
  },
  {
    trackId: 2,
    trackName: 'Song B',
    artistName: 'Artist B',
    artworkUrl: 'b.jpg',
    previewUrl: 'b.mp3',
    albumName: 'Album B'
  }
]

describe('<Music /> container', () => {
  const defaultProps = {
    songs: [],
    loading: false,
    currentSong: null,
    isPlaying: false,
    likedTrackIds: {},
    dispatchSearch: jest.fn(),
    dispatchSetSong: jest.fn(),
    dispatchFetchLibrary: jest.fn(),
    dispatchLike: jest.fn(),
    dispatchUnlike: jest.fn(),
    dispatchSetIsPlaying: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  it('should render the page title', () => {
    const { getByText } = renderProvider(<Music {...defaultProps} />)
    expect(getByText('MUSICA')).toBeTruthy()
  })

  it('should render navigation links', () => {
    const { getByTestId } = renderProvider(<Music {...defaultProps} />)
    expect(getByTestId('nav-search')).toBeTruthy()
    expect(getByTestId('nav-favorites')).toBeTruthy()
  })

  it('should render the search bar', () => {
    const { getByTestId } = renderProvider(<Music {...defaultProps} />)
    expect(getByTestId('music-search-input')).toBeTruthy()
  })

  it('should fetch library on mount', () => {
    renderProvider(<Music {...defaultProps} />)
    expect(defaultProps.dispatchFetchLibrary).toHaveBeenCalledTimes(1)
  })

  it('should render songs when provided', () => {
    const props = { ...defaultProps, songs: mockSongs }
    const { getByTestId } = renderProvider(<Music {...props} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should render loading spinner when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<Music {...props} />)
    expect(getByTestId('loading-spinner')).toBeTruthy()
  })

  it('should navigate to track detail when card clicked', () => {
    const props = { ...defaultProps, songs: mockSongs }
    const { getByTestId } = renderProvider(<Music {...props} />)
    const { fireEvent } = require('@testing-library/react')
    fireEvent.click(getByTestId('song-1'))
    expect(mockPush).toHaveBeenCalledWith('/track/1')
  })
})
