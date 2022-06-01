import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepo } from '@services/info';
import { ERRORS } from '@app/utils/constants';
import { infoTypes, infoCreators, INFO_PAYLOAD } from './reducer';

export function* requestInfo(action) {
  try {
    if (!action[INFO_PAYLOAD.REPO] || !action[INFO_PAYLOAD.OWNER]) {
      throw new Error(ERRORS.INSUFFICIENT_INFO);
    }
    const response = yield call(getRepo, action[INFO_PAYLOAD.REPO], action[INFO_PAYLOAD.OWNER]);
    yield put(infoCreators.successInfo(response));
  } catch (error) {
    console.error(error.message);
    yield put(infoCreators.failureInfo(error.message));
  }
}

export default function* appSaga() {
  yield takeLatest(infoTypes.REQUEST_INFO, requestInfo);
}
