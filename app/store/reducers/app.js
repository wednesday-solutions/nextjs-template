/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { repoName: null, reposData: [], reposError: null };

export const { Types: appTypes, Creators: appCreators } = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: []
});

/* eslint-disable default-case, no-param-reassign */
export const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.REQUEST_GET_GITHUB_REPOS:
        draft.repoName = action.repoName;
        break;
      case appTypes.CLEAR_GITHUB_REPOS:
        return initialState;
      case appTypes.SUCCESS_GET_GITHUB_REPOS:
        draft.reposData = action.data;
        break;
      case appTypes.FAILURE_GET_GITHUB_REPOS:
        draft.reposError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default appReducer;
