import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthDomain = (state) => state.auth || initialState;

export const selectAuthData = () => createSelector(selectAuthDomain, (substate) => get(substate, PAYLOAD.DATA, null));

export const selectAuthError = () => createSelector(selectAuthDomain, (substate) => get(substate, PAYLOAD.ERROR, null));

export const selectAuthLoading = () =>
  createSelector(selectAuthDomain, (substate) => get(substate, PAYLOAD.LOADING, false));
