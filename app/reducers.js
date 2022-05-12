/*
  Combine all reducers in this file and export the combined reducers.
*/

import { combineReducers } from 'redux';
// import { reposReducer } from './containers/Repos/reducer';
import { enableAllPlugins } from 'immer';
// import infoReducer from './store/reducers/info';

enableAllPlugins();

export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer
    // repos: reposReducer,
    // info: infoReducer
  });

  return rootReducer;
}
