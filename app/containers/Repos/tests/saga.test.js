/**
 * Test app sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import appSaga, { getGithubRepos } from '../../../containers/Repos/saga';
import { reposActionTypes, REPOS_PAYLOAD } from '../reducer';

describe('App saga tests', () => {
  const generator = appSaga();
  const repoName = 'mac';
  let getGithubReposGenerator = getGithubRepos({ [REPOS_PAYLOAD.SEARCH_KEY]: repoName });

  it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
    expect(generator.next().value).toEqual(takeLatest(reposActionTypes.REQUEST_GET_GITHUB_REPOS, getGithubRepos));
  });

  it('should ensure that the action FAILURE_GET_GITHUB_REPOS is dispatched when the api call fails', () => {
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: reposActionTypes.FAILURE_GET_GITHUB_REPOS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getGithubReposGenerator = getGithubRepos({ [REPOS_PAYLOAD.SEARCH_KEY]: repoName });
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const reposResponse = {
      totalCount: 1,
      items: [{ repositoryName: repoName }]
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: reposActionTypes.SUCCESS_GET_GITHUB_REPOS,
        data: reposResponse
      })
    );
  });
});
