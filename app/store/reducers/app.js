/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
export const initialState = {};

export const { Types: appTypes, Creators: appCreators } = createActions({
  setLoading: ['loading'],
  setError: ['error'],
  requestUserProfile: ['data'],
  successUserProfile: ['data'],
  failureUserProfile: ['data']
});

/* eslint-disable default-case, no-param-reassign */
export const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.SET_LOADING:
        draft.loading = action.loading;
        break;
      case appTypes.SET_ERROR:
        draft.error = action.error;
        break;
      default:
        return state;
    }
  });

export default appReducer;
