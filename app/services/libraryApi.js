import { generateApiClient } from '@utils/apiUtils';

const musicApi = generateApiClient('music');

export const fetchLibrary = () => musicApi.get('/music/library');

export const likeSong = (songData) => musicApi.post('/music/library/like', songData);

export const unlikeSong = (trackId) => musicApi.delete(`/music/library/unlike/${trackId}`);
