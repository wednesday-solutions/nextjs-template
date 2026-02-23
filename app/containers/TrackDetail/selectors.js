import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { TRACK_DETAIL_PAYLOAD } from './constants';

const selectTrackDetailDomain = (state) => state.trackDetail || initialState;

export const selectTrackData = () =>
  createSelector(selectTrackDetailDomain, (s) => get(s, TRACK_DETAIL_PAYLOAD.TRACK_DATA, null));

export const selectTrackDetailLoading = () =>
  createSelector(selectTrackDetailDomain, (s) => get(s, PAYLOAD.LOADING, false));

export const selectTrackDetailError = () => createSelector(selectTrackDetailDomain, (s) => get(s, PAYLOAD.ERROR, null));
