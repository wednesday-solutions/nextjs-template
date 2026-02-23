import { call, put, takeLatest } from 'redux-saga/effects';
import { searchSongs } from '@services/musicApi';
import { musicTypes, musicCreators } from './reducer';
import { MUSIC_PAYLOAD } from './constants';

const { successSearchSongs, failureSearchSongs } = musicCreators;

export function* handleSearchSongs(action) {
  const term = action[MUSIC_PAYLOAD.SEARCH_TERM];
  const response = yield call(searchSongs, term);
  if (response.ok) {
    yield put(successSearchSongs(response.data));
  } else {
    yield put(failureSearchSongs(response.data));
  }
}

export default function* musicSaga() {
  yield takeLatest(musicTypes.REQUEST_SEARCH_SONGS, handleSearchSongs);
}
