import { generateApiClient } from '@utils/apiUtils';

const musicApi = generateApiClient('music');

export const searchSongs = (term) => musicApi.get(`/music/resources/songs?term=${encodeURIComponent(term)}`);
