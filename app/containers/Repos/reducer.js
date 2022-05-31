/*
 *
 * Repos reducer
 *
 */
import { PAYLOAD, startLoading, stopLoading, setError, setData } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const REPOS_PAYLOAD = {
  SEARCH_KEY: 'searchKey'
};

export const initialState = {
  [REPOS_PAYLOAD.SEARCH_KEY]: null,
  [PAYLOAD.DATA]: {},
  [PAYLOAD.ERROR]: null
};

export const { Types: reposActionTypes, Creators: reposActionCreators } = createActions({
  requestGetGithubRepos: [REPOS_PAYLOAD.SEARCH_KEY],
  successGetGithubRepos: [PAYLOAD.DATA],
  failureGetGithubRepos: [PAYLOAD.ERROR],
  clearGithubRepos: null
});

export const reposReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case reposActionTypes.REQUEST_GET_GITHUB_REPOS:
        startLoading(draft);
        break;
      case reposActionTypes.SUCCESS_GET_GITHUB_REPOS:
        stopLoading(draft);
        setData(draft, action);
        break;
      case reposActionTypes.FAILURE_GET_GITHUB_REPOS:
        stopLoading(draft);
        setError(draft);
        break;
      case reposActionTypes.CLEAR_GITHUB_REPOS:
        draft = initialState;
        break;
      default:
        draft = initialState;
    }
  });

export default reposReducer;
