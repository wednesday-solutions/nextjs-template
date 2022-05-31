/**
 * Test info sagas
 */

import { takeLatest } from 'redux-saga/effects';
import infoSaga, { defaultFunction } from '../saga';
import { infoTypes } from '../reducer';

describe('Info saga tests', () => {
  const generator = infoSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(infoTypes.DEFAULT_ACTION, defaultFunction));
  });
});
