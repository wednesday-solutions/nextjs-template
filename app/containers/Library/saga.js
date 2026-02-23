import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLibrary, likeSong, unlikeSong } from '@services/libraryApi';
import { libraryTypes, libraryCreators } from './reducer';
import { LIBRARY_PAYLOAD } from './constants';

const { successFetchLibrary, failureFetchLibrary } = libraryCreators;
const { successLikeSong, failureLikeSong } = libraryCreators;
const { successUnlikeSong, failureUnlikeSong } = libraryCreators;

export function* handleFetchLibrary() {
  const response = yield call(fetchLibrary);
  if (response.ok) {
    yield put(successFetchLibrary(response.data));
  } else {
    yield put(failureFetchLibrary(response.data));
  }
}

export function* handleLikeSong(action) {
  const songData = action[LIBRARY_PAYLOAD.SONG_DATA];
  const response = yield call(likeSong, songData);
  if (response.ok) {
    yield put(successLikeSong(songData));
  } else {
    yield put(failureLikeSong(response.data));
  }
}

export function* handleUnlikeSong(action) {
  const trackId = action[LIBRARY_PAYLOAD.TRACK_ID];
  const response = yield call(unlikeSong, trackId);
  if (response.ok) {
    yield put(successUnlikeSong(trackId));
  } else {
    yield put(failureUnlikeSong(response.data));
  }
}

export default function* librarySaga() {
  yield takeLatest(libraryTypes.REQUEST_FETCH_LIBRARY, handleFetchLibrary);
  yield takeLatest(libraryTypes.REQUEST_LIKE_SONG, handleLikeSong);
  yield takeLatest(libraryTypes.REQUEST_UNLIKE_SONG, handleUnlikeSong);
}
