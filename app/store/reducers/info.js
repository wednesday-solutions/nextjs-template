/*
 *
 * /info reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { chainDraftSetters, setData, startLoading, stopLoading } from '../../utils/reducer';

export const initialState = { loading: false, data: {}, error: null };

export const { Types: infoTypes, Creators: infoCreators } = createActions({
  requestInfo: ['repo', 'owner'],
  successInfo: ['data'],
  failureInfo: []
});

export const { REQUEST_INFO, SUCCESS_INFO, FAILURE_INFO } = infoTypes;
export const { requestInfo, successInfo, failureInfo } = infoCreators;

export const infoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_INFO:
        return startLoading(draft);
      case SUCCESS_INFO:
        return chainDraftSetters(draft, [stopLoading, [setData, [action.data]]]);
      case FAILURE_INFO:
        return stopLoading(draft);
    }
  });

export default infoReducer;
