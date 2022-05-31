import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';

import { REPOS_PAYLOAD, initialState } from './reducer';

const selectReposDomain = (state) => state.repos || initialState;

export const selectReposData = () => createSelector(selectReposDomain, (substate) => get(substate, PAYLOAD.DATA, null));

export const selectReposError = () =>
  createSelector(selectReposDomain, (substate) => get(substate, PAYLOAD.ERROR, null));

export const selectReposSearchKey = () =>
  createSelector(selectReposDomain, (substate) => get(substate, REPOS_PAYLOAD.SEARCH_KEY, null));
