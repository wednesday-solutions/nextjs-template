import MockAdapter from 'axios-mock-adapter'
import { getApiClient } from '@utils/apiUtils'
import { fetchLibrary, likeSong, unlikeSong } from '../libraryApi'

describe('libraryApi tests', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(getApiClient('music').axiosInstance)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should fetch the library via GET /music/library', async () => {
    const data = [{ trackId: 1, trackName: 'Song A' }]
    mock.onGet('/music/library').reply(200, data)
    const res = await fetchLibrary()
    expect(res.ok).toBe(true)
  })

  it('should like a song via POST /music/library/like', async () => {
    const songData = { trackId: 1, trackName: 'Song A' }
    mock.onPost('/music/library/like').reply(200, { success: true })
    const res = await likeSong(songData)
    expect(res.ok).toBe(true)
  })

  it('should unlike a song via DELETE /music/library/unlike/:id', async () => {
    mock.onDelete('/music/library/unlike/1').reply(200, { success: true })
    const res = await unlikeSong(1)
    expect(res.ok).toBe(true)
  })
})
