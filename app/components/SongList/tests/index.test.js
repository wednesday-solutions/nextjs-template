import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import SongList from '../index'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush })
}))

jest.mock('@components/ArtworkPlayButton', () => {
  const PT = require('prop-types')
  const Mock = ({ onClick, isPlaying, isActive }) => (
    <button data-testid='artwork-play-btn' onClick={onClick}>
      {isActive && isPlaying ? 'pause' : 'play'}
    </button>
  )
  Mock.displayName = 'MockArtworkPlayButton'
  Mock.propTypes = { onClick: PT.func, isPlaying: PT.bool, isActive: PT.bool }
  return Mock
})

const mockSongs = [
  {
    trackId: 1,
    trackName: 'Song A',
    artistName: 'Artist A',
    albumName: 'Album A',
    artworkUrl: 'a.jpg'
  },
  {
    trackId: 2,
    trackName: 'Song B',
    artistName: 'Artist B',
    albumName: 'Album B',
    artworkUrl: 'b.jpg'
  }
]

describe('<SongList />', () => {
  const mockPlayToggle = jest.fn()
  const mockToggleLike = jest.fn()
  const defaultProps = {
    songs: mockSongs,
    currentSong: null,
    isPlaying: false,
    onPlayToggle: mockPlayToggle
  }

  beforeEach(() => jest.clearAllMocks())

  it('should render all songs', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should navigate to track detail when card clicked', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    fireEvent.click(getByTestId('song-1'))
    expect(mockPush).toHaveBeenCalledWith('/track/1')
  })

  it('should call onPlayToggle when artwork clicked', () => {
    const { getAllByTestId } = renderProvider(<SongList {...defaultProps} />)
    fireEvent.click(getAllByTestId('artwork-play-btn')[0])
    expect(mockPlayToggle).toHaveBeenCalledWith(mockSongs[0])
  })

  it('should render song details', () => {
    const { getByText } = renderProvider(<SongList {...defaultProps} />)
    expect(getByText('Song A')).toBeTruthy()
    expect(getByText('Artist A')).toBeTruthy()
    expect(getByText('Album A')).toBeTruthy()
  })

  it('should render empty list when no songs', () => {
    const props = { ...defaultProps, songs: [] }
    const { getByTestId } = renderProvider(<SongList {...props} />)
    expect(getByTestId('song-list').children.length).toBe(0)
  })

  it('should not render heart buttons without onToggleLike', () => {
    const { queryAllByTestId } = renderProvider(<SongList {...defaultProps} />)
    expect(queryAllByTestId('heart-button')).toHaveLength(0)
  })

  it('should render heart buttons when onToggleLike is provided', () => {
    const props = {
      ...defaultProps,
      onToggleLike: mockToggleLike,
      likedTrackIds: {}
    }
    const { getAllByTestId } = renderProvider(<SongList {...props} />)
    expect(getAllByTestId('heart-button')).toHaveLength(2)
  })

  it('should call onToggleLike with song data when heart clicked', () => {
    const props = {
      ...defaultProps,
      onToggleLike: mockToggleLike,
      likedTrackIds: {}
    }
    const { getAllByTestId } = renderProvider(<SongList {...props} />)
    fireEvent.click(getAllByTestId('heart-button')[0])
    expect(mockToggleLike).toHaveBeenCalledWith(mockSongs[0])
  })
})
