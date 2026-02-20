import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectThemeDomain = (state) => state.theme || initialState;

export const selectTheme = () => createSelector(selectThemeDomain, (substate) => substate.theme);

export const selectIsDarkMode = () => createSelector(selectThemeDomain, (substate) => substate.theme === 'dark');
