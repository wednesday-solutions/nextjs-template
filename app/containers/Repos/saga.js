import { call, put, takeLatest } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { reposActionTypes, reposActionCreators, REPOS_PAYLOAD } from './reducer';

const { REQUEST_GET_GITHUB_REPOS } = reposActionTypes;
const { successGetGithubRepos, failureGetGithubRepos } = reposActionCreators;

/**
 * Get the github repos
 * @param {object} action
 * @param {string} action[REPOS_PAYLOAD.SEARCH_KEY] - The search key
 * @returns {object} - The response from the API
 */
export function* getGithubRepos(action) {
  const response = yield call(getRepos, action[REPOS_PAYLOAD.SEARCH_KEY]);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}

/**
 * The root of the repos saga
 * @returns {void}
 * @yields {object} - The response from the API
 */
export default function* appSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
}
