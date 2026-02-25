import { call, put, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { loginUser, signupUser } from '@services/authApi';
import { setStoredToken } from '@utils/authStorage';
import { setAuthHeader } from '@utils/apiUtils';
import { authTypes, authCreators } from './reducer';

const { successAuth, failureAuth } = authCreators;

const isUserVerified = (data) => data?.user?.userMetadata?.emailVerified === true;

const persistToken = (data) => {
  if (data?.accessToken) {
    setStoredToken(data.accessToken);
    setAuthHeader('music', data.accessToken);
  }
};

export function* handleLogin(action) {
  const { email, password } = action;
  const response = yield call(loginUser, { email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
    persistToken(response.data);
    Router.push('/');
  } else {
    yield put(failureAuth(response.data));
  }
}

export function* handleSignup(action) {
  const { email, password } = action;
  const response = yield call(signupUser, { email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
    if (!isUserVerified(response.data)) {
      Router.push('/verify-email');
    }
  } else {
    yield put(failureAuth(response.data));
  }
}

export default function* authSaga() {
  yield takeLatest(authTypes.REQUEST_LOGIN, handleLogin);
  yield takeLatest(authTypes.REQUEST_SIGNUP, handleSignup);
}
