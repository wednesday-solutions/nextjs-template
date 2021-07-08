import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepo } from '@services/info';
import { ERRORS } from '@app/utils/constants';
import { REQUEST_INFO, successInfo, failureInfo } from '../reducers/info';

export function* requestInfo({ repo, owner }) {
  try {
    if (!repo || !owner) {
      throw new Error(ERRORS.INSUFFICIENT_INFO);
    }
    const response = yield call(getRepo, repo, owner);
    yield put(successInfo(response));
  } catch (error) {
    console.error(error.message);
    yield put(failureInfo(error.message));
  }
}

export default function* appSaga() {
  yield takeLatest(REQUEST_INFO, requestInfo);
}
