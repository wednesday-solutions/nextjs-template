import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from '../reducers/app';

const selectAppDomain = (state) => state.app || initialState;

export const selectLoading = () => createSelector(selectAppDomain, (substate) => get(substate, 'loading', false));

export const selectError = () => createSelector(selectAppDomain, (substate) => get(substate, 'error', false));

export const makeSelectApp = () => createSelector(selectAppDomain, (substate) => substate);

export default makeSelectApp;
