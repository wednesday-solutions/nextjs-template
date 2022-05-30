/*
 *
 * /info reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { setError, setData, startLoading, stopLoading, PAYLOAD } from '../../utils/reducer';

export const INFO_PAYLOAD = {
  REPO: 'repo',
  OWNER: 'owner'
};

export const initialState = { [PAYLOAD.LOADING]: false, [PAYLOAD.DATA]: {}, [PAYLOAD.ERROR]: null };

export const { Types: infoTypes, Creators: infoCreators } = createActions({
  requestInfo: [INFO_PAYLOAD.REPO, INFO_PAYLOAD.OWNER],
  successInfo: [PAYLOAD.DATA],
  failureInfo: [PAYLOAD.ERROR]
});

export const infoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case infoTypes.REQUEST_INFO:
        startLoading(draft);
        break;
      case infoTypes.SUCCESS_INFO:
        stopLoading(draft);
        setData(draft, action);
        break;
      case infoTypes.FAILURE_INFO:
        stopLoading(draft);
        setError(draft);
        break;
      default:
        draft = initialState;
    }
  });

export default infoReducer;
