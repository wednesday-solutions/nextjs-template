/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import { appReducer } from './store/reducers/app';

export default function createReducer() {
  const rootReducer = combineReducers({
    app: appReducer
  });

  return rootReducer;
}
