import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { MUSIC_PAYLOAD } from './constants';

const selectMusicDomain = (state) => state.music || initialState;

export const selectMusicSongs = () => createSelector(selectMusicDomain, (s) => get(s, MUSIC_PAYLOAD.SONGS, []));

export const selectMusicLoading = () => createSelector(selectMusicDomain, (s) => get(s, PAYLOAD.LOADING, false));

export const selectMusicError = () => createSelector(selectMusicDomain, (s) => get(s, PAYLOAD.ERROR, null));

export const selectCurrentSong = () =>
  createSelector(selectMusicDomain, (s) => get(s, MUSIC_PAYLOAD.CURRENT_SONG, null));

export const selectSearchTerm = () => createSelector(selectMusicDomain, (s) => get(s, MUSIC_PAYLOAD.SEARCH_TERM, ''));
