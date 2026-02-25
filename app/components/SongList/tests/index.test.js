import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import SongList from '../index'

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
  const mockSelect = jest.fn()
  const mockToggleLike = jest.fn()
  const defaultProps = {
    songs: mockSongs,
    currentSong: null,
    onSelectSong: mockSelect
  }

  beforeEach(() => {
    mockSelect.mockClear()
    mockToggleLike.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongList {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render all songs', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should call onSelectSong when a song is clicked', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    fireEvent.click(getByTestId('song-1'))
    expect(mockSelect).toHaveBeenCalledWith(mockSongs[0])
  })

  it('should render song details', () => {
    const { getByText } = renderProvider(<SongList {...defaultProps} />)
    expect(getByText('Song A')).toBeTruthy()
    expect(getByText('Artist A')).toBeTruthy()
    expect(getByText('Album A')).toBeTruthy()
  })

  it('should render empty list when no songs', () => {
    const { getByTestId } = renderProvider(
      <SongList songs={[]} currentSong={null} onSelectSong={mockSelect} />
    )
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

  it('should show filled heart for liked songs', () => {
    const props = {
      ...defaultProps,
      onToggleLike: mockToggleLike,
      likedTrackIds: { 1: true }
    }
    const { getAllByLabelText } = renderProvider(<SongList {...props} />)
    expect(getAllByLabelText('Unlike song')).toHaveLength(1)
    expect(getAllByLabelText('Like song')).toHaveLength(1)
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
