/*
Combine all reducers in this file and export the combined reducers.
*/

import { enableAllPlugins } from 'immer';
import { combineReducers } from 'redux';

import repos from './containers/Repos/reducer';
import info from './containers/Info/reducer';

enableAllPlugins();

export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    repos,
    info
  });

  return rootReducer;
}
