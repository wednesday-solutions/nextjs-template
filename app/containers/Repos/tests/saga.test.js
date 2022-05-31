/**
 * Test repos sagas
 */

import { takeLatest } from 'redux-saga/effects';
import reposSaga, { defaultFunction } from '../saga';
import { reposTypes } from '../reducer';

describe('Repos saga tests', () => {
  const generator = reposSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(reposTypes.DEFAULT_ACTION, defaultFunction));
  });
});
