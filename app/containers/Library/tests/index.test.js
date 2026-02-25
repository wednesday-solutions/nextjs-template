import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import { LibraryTest as Library } from '../index'

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
  const PT = require('prop-types')
  const MockPlayer = ({ onNext, onPrev }) => (
    <div data-testid='audio-player'>
      <button data-testid='mock-next' onClick={onNext}>
        Next
      </button>
      <button data-testid='mock-prev' onClick={onPrev}>
        Prev
      </button>
    </div>
  )
  MockPlayer.displayName = 'MockAudioPlayer'
  MockPlayer.propTypes = { onNext: PT.func, onPrev: PT.func }
  return MockPlayer
})

const mockSongs = [
  {
    trackId: 1,
    trackName: 'Song A',
    artistName: 'Artist A',
    artworkUrl: 'a.jpg',
    albumName: 'Album A'
  },
  {
    trackId: 2,
    trackName: 'Song B',
    artistName: 'Artist B',
    artworkUrl: 'b.jpg',
    albumName: 'Album B'
  }
]

describe('<Library /> container', () => {
  const mockFetchLibrary = jest.fn()
  const mockSetSong = jest.fn()
  const mockLike = jest.fn()
  const mockUnlike = jest.fn()
  const defaultProps = {
    likedSongs: [],
    likedTrackIds: {},
    loading: false,
    currentSong: null,
    dispatchFetchLibrary: mockFetchLibrary,
    dispatchSetSong: mockSetSong,
    dispatchLike: mockLike,
    dispatchUnlike: mockUnlike
  }

  beforeEach(() => jest.clearAllMocks())

  it('should render the page title', () => {
    const { getByText } = renderProvider(<Library {...defaultProps} />)
    expect(getByText('MUSICA')).toBeTruthy()
  })

  it('should render navigation links', () => {
    const { getByTestId } = renderProvider(<Library {...defaultProps} />)
    expect(getByTestId('nav-search')).toBeTruthy()
    expect(getByTestId('nav-favorites')).toBeTruthy()
  })

  it('should fetch library on mount', () => {
    renderProvider(<Library {...defaultProps} />)
    expect(mockFetchLibrary).toHaveBeenCalledTimes(1)
  })

  it('should render empty state when no liked songs', () => {
    const { getByTestId } = renderProvider(<Library {...defaultProps} />)
    expect(getByTestId('empty-library')).toBeTruthy()
  })

  it('should render liked songs', () => {
    const props = {
      ...defaultProps,
      likedSongs: mockSongs,
      likedTrackIds: { 1: true, 2: true }
    }
    const { getByTestId } = renderProvider(<Library {...props} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should render loading spinner when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<Library {...props} />)
    expect(getByTestId('loading-spinner')).toBeTruthy()
  })

  it('should select a song when clicked', () => {
    const props = {
      ...defaultProps,
      likedSongs: mockSongs,
      likedTrackIds: { 1: true, 2: true }
    }
    const { getByTestId } = renderProvider(<Library {...props} />)
    fireEvent.click(getByTestId('song-1'))
    expect(mockSetSong).toHaveBeenCalledWith(mockSongs[0])
  })
})
