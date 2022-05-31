import { PAYLOAD } from '@app/utils/reducer';
import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

const selectInfoDomain = (state) => state.info || initialState;

export const selectInfoLoading = () => createSelector(selectInfoDomain, (substate) => get(substate, PAYLOAD.LOADING));
export const selectInfoData = () => createSelector(selectInfoDomain, (substate) => get(substate, PAYLOAD.DATA, {}));
