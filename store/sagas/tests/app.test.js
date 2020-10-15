/**
 * Test app sagas
 */
import { takeLatest } from 'redux-saga/effects';
import appSaga, { requestUserProfile } from '../app';
import { appTypes } from '../../reducers/app';

describe('App saga tests', () => {
  const generator = appSaga();

  it('should start task to watch for REQUEST_USER_PROFILE action', () => {
    expect(generator.next().value).toEqual(takeLatest(appTypes.REQUEST_USER_PROFILE, requestUserProfile));
  });
});
