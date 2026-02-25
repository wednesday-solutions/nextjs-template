import { PAYLOAD, startLoading, stopLoading, setError, setData } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  [PAYLOAD.DATA]: null,
  [PAYLOAD.ERROR]: null,
  [PAYLOAD.LOADING]: false
};

export const { Types: authTypes, Creators: authCreators } = createActions({
  requestLogin: ['email', 'password'],
  successAuth: [PAYLOAD.DATA],
  failureAuth: [PAYLOAD.ERROR],
  requestSignup: ['email', 'password'],
  clearAuth: null
});

const handleRequest = (draft) => {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
};

const handleSuccess = (draft, action) => {
  stopLoading(draft);
  setData(draft, action);
};

const handleFailure = (draft, action) => {
  stopLoading(draft);
  setError(draft, action);
};

const handlers = {
  [authTypes.REQUEST_LOGIN]: handleRequest,
  [authTypes.REQUEST_SIGNUP]: handleRequest,
  [authTypes.SUCCESS_AUTH]: handleSuccess,
  [authTypes.FAILURE_AUTH]: handleFailure,
  [authTypes.CLEAR_AUTH]: () => initialState
};

export const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const handler = handlers[action.type];
    return handler ? handler(draft, action) : state;
  });

export default authReducer;
