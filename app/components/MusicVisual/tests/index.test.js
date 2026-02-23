import React from 'react'
import { renderProvider } from '@utils/testUtils'
import MusicVisual from '../index'

describe('<MusicVisual />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<MusicVisual />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the vinyl record', () => {
    const { getByTestId } = renderProvider(<MusicVisual />)
    expect(getByTestId('vinyl-record')).toBeTruthy()
  })

  it('should render the brand text', () => {
    const { getByText } = renderProvider(<MusicVisual />)
    expect(getByText('MUSICA')).toBeTruthy()
  })

  it('should render the tagline', () => {
    const { getByText } = renderProvider(<MusicVisual />)
    expect(getByText('FEEL THE RHYTHM')).toBeTruthy()
  })
})
