import React from 'react'
import { renderProvider } from '@utils/testUtils'
import TrackInfo from '../index'

const mockTrack = {
  trackId: 123,
  trackName: 'Metamorphosis',
  artistName: 'emi',
  albumName: 'Metamorphosis - Single',
  artworkUrl: 'art.jpg',
  genre: 'Pop',
  durationMs: 210000,
  releaseDate: '2024-01-15T00:00:00Z',
  trackPrice: 1.29,
  currency: 'USD',
  trackUrl: 'https://music.apple.com/track/123'
}

describe('<TrackInfo />', () => {
  it('should render track name and artist', () => {
    const { getByText } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByText('Metamorphosis')).toBeTruthy()
    expect(getByText('emi')).toBeTruthy()
  })

  it('should render album name', () => {
    const { getByText } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByText('Metamorphosis - Single')).toBeTruthy()
  })

  it('should render genre tag', () => {
    const { getByTestId } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByTestId('tag-genre').textContent).toBe('Pop')
  })

  it('should render formatted duration', () => {
    const { getByTestId } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByTestId('tag-duration').textContent).toBe('3:30')
  })

  it('should render release year', () => {
    const { getByTestId } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByTestId('tag-release').textContent).toBe('2024')
  })

  it('should render price tag', () => {
    const { getByTestId } = renderProvider(<TrackInfo track={mockTrack} />)
    expect(getByTestId('tag-price').textContent).toBe('USD 1.29')
  })

  it('should render store link', () => {
    const { getByTestId } = renderProvider(<TrackInfo track={mockTrack} />)
    const link = getByTestId('store-link')
    expect(link.getAttribute('href')).toBe('https://music.apple.com/track/123')
  })
})
