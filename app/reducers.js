/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { enableMapSet } from 'immer';
import { combineReducers } from 'redux';

import { appReducer } from './store/reducers/app';
import infoReducer from './store/reducers/info';

enableMapSet();

export default function createReducer() {
  const rootReducer = combineReducers({
    app: appReducer,
    info: infoReducer
  });

  return rootReducer;
}
