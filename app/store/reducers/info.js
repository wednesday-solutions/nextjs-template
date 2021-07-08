/*
 *
 * /info reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { chainMethods, setData, startLoading, stopLoading } from './utils';

export const initialState = new Map(Object.entries({ loading: false, data: {} }));

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
        return chainMethods(draft, [stopLoading, [setData, action.data]]);
      case FAILURE_INFO:
        return stopLoading(draft);
    }
  });

export default infoReducer;
