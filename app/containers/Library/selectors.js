import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { LIBRARY_PAYLOAD } from './constants';

const selectLibraryDomain = (state) => state.library || initialState;

export const selectLikedSongs = () =>
  createSelector(selectLibraryDomain, (s) => get(s, LIBRARY_PAYLOAD.LIKED_SONGS, []));

export const selectLikedTrackIds = () =>
  createSelector(selectLibraryDomain, (s) => get(s, LIBRARY_PAYLOAD.LIKED_TRACK_IDS, {}));

export const selectLibraryLoading = () => createSelector(selectLibraryDomain, (s) => get(s, PAYLOAD.LOADING, false));

export const selectLibraryError = () => createSelector(selectLibraryDomain, (s) => get(s, PAYLOAD.ERROR, null));
