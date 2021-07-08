import { createSelector } from 'reselect';
import { initialState } from '../reducers/info';

const selectInfoDomain = (state) => state.info || initialState;

export const selectInfoLoading = () => createSelector(selectInfoDomain, (substate) => substate.get('loading'));
export const selectInfoData = () => createSelector(selectInfoDomain, (substate) => substate.get('data'));
