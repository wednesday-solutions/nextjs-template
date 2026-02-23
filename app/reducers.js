/*
Combine all reducers in this file and export the combined reducers.
*/

import { enableAllPlugins } from 'immer';
import { combineReducers } from 'redux';

import repos from './containers/Repos/reducer';
import info from './containers/Info/reducer';
import auth from './containers/Auth/reducer';
import music from './containers/Music/reducer';
import library from './containers/Library/reducer';
import trackDetail from './containers/TrackDetail/reducer';

enableAllPlugins();

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    repos,
    info,
    auth,
    music,
    library,
    trackDetail
  });

  return rootReducer;
}
