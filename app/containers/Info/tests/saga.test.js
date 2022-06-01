import { takeLatest, call } from 'redux-saga/effects';
import { getRepo } from '@services/info';
import appSaga, { requestInfo } from '../saga';
import { infoTypes } from '../reducer';

describe('InfoContainer saga tests', () => {
  const generator = appSaga();
  const repo = 'mac';
  const owner = 'wednesday';
  let getGithubReposGenerator = requestInfo({ repo, owner });

  it('should start task to watch for REQUEST_INFO action', () => {
    expect(generator.next().value).toEqual(takeLatest(infoTypes.REQUEST_INFO, requestInfo));
  });

  it('should ensure that the action failureInfo is dispatched when the api call fails', () => {
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepo, repo, owner));
  });

  it('should ensure that the action SUCCESS_INFO is dispatched when the api call succeeds', () => {
    getGithubReposGenerator = requestInfo({ repo, owner });
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepo, repo, owner));
  });
});
