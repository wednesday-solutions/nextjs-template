import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTrackDetails } from '@services/musicApi';
import { trackDetailTypes, trackDetailCreators } from './reducer';
import { TRACK_DETAIL_PAYLOAD } from './constants';

const { successTrackDetail, failureTrackDetail } = trackDetailCreators;

export function* handleFetchTrackDetail(action) {
  const trackId = action[TRACK_DETAIL_PAYLOAD.TRACK_ID];
  const response = yield call(fetchTrackDetails, trackId);
  if (response.ok) {
    yield put(successTrackDetail(response.data));
  } else {
    yield put(failureTrackDetail(response.data));
  }
}

export default function* trackDetailSaga() {
  yield takeLatest(trackDetailTypes.REQUEST_TRACK_DETAIL, handleFetchTrackDetail);
}
