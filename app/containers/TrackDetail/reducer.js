import { PAYLOAD, startLoading, stopLoading, setError } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { TRACK_DETAIL_PAYLOAD } from './constants';

export const initialState = {
  [TRACK_DETAIL_PAYLOAD.TRACK_DATA]: null,
  [PAYLOAD.ERROR]: null,
  [PAYLOAD.LOADING]: false
};

export const { Types: trackDetailTypes, Creators: trackDetailCreators } = createActions({
  requestTrackDetail: [TRACK_DETAIL_PAYLOAD.TRACK_ID],
  successTrackDetail: [PAYLOAD.DATA],
  failureTrackDetail: [PAYLOAD.ERROR],
  clearTrackDetail: null
});

const handleRequest = (draft) => {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
};

const handleSuccess = (draft, action) => {
  stopLoading(draft);
  draft[TRACK_DETAIL_PAYLOAD.TRACK_DATA] = action[PAYLOAD.DATA] || null;
};

const handleFailure = (draft, action) => {
  stopLoading(draft);
  setError(draft, action);
};

const handlers = {
  [trackDetailTypes.REQUEST_TRACK_DETAIL]: handleRequest,
  [trackDetailTypes.SUCCESS_TRACK_DETAIL]: handleSuccess,
  [trackDetailTypes.FAILURE_TRACK_DETAIL]: handleFailure,
  [trackDetailTypes.CLEAR_TRACK_DETAIL]: () => initialState
};

export const trackDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const handler = handlers[action.type];
    return handler ? handler(draft, action) : state;
  });

export default trackDetailReducer;
