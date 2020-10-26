import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from '../reducers/app';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = (state) => state.app || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by app
 */

export const selectApp = () => createSelector(selectAppDomain, (substate) => substate);

export const selectReposData = () => createSelector(selectAppDomain, (substate) => get(substate, 'reposData', null));

export const selectReposError = () => createSelector(selectAppDomain, (substate) => get(substate, 'reposError', null));

export const selectRepoName = () => createSelector(selectAppDomain, (substate) => get(substate, 'repoName', null));

export default selectApp;
