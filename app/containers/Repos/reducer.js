/*
 *
 * Repos reducer
 *
 */
import { PAYLOAD, chainDraftSetters, startLoading, stopLoading, setError } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const REPOS_PAYLOAD = {
  SEARCH_KEY: 'searchKey'
};

export const initialState = {
  [REPOS_PAYLOAD.SEARCH_KEY]: null,
  data: [],
  error: null
};

export const { Types: reposActionTypes, Creators: reposActionCreators } = createActions({
  requestGetGithubRepos: [REPOS_PAYLOAD.SEARCH_KEY],
  successGetGithubRepos: [PAYLOAD.DATA],
  failureGetGithubRepos: [PAYLOAD.ERROR],
  clearGithubRepos: null
});

export const reposReducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case reposActionTypes.REQUEST_GET_GITHUB_REPOS:
        startLoading(draft);
        break;
      case reposActionTypes.FAILURE_GET_GITHUB_REPOS:
        chainDraftSetters(draft, [stopLoading, [setError, [action]]]);
        break;
      case reposActionTypes.CLEAR_GITHUB_REPOS:
        draft = initialState;
        break;
    }
  });

export default reposReducer;
