import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { appTypes, appCreators } from '../reducers/app';

const { REQUEST_GET_GITHUB_REPOS } = appTypes;
const { successGetGithubRepos, failureGetGithubRepos } = appCreators;

export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}
// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
}
