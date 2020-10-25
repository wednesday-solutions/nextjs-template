import { takeLatest, put } from 'redux-saga/effects';
import { appTypes, appCreators } from '../reducers/app';

const { REQUEST_USER_PROFILE } = appTypes;

export function* requestUserProfile() {
  try {
    yield put(appCreators.successUserProfile());
  } catch {
    yield put(appCreators.failureUserProfile());
  }
}

export default function* appSaga() {
  yield takeLatest(REQUEST_USER_PROFILE, requestUserProfile);
}
