import { PAYLOAD } from '@app/utils/reducer';
import { reposReducer, initialState, reposActionTypes, REPOS_PAYLOAD } from '../../../containers/Repos/reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Repos reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(reposReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_GITHUB_REPOS is dispatched', () => {
    const repoName = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, loading: true };
    expect(
      reposReducer(state, {
        type: reposActionTypes.REQUEST_GET_GITHUB_REPOS,
        [REPOS_PAYLOAD.SEARCH_KEY]: repoName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when SUCCESS_GET_GITHUB_REPOS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, data, loading: false };
    expect(
      reposReducer(state, {
        type: reposActionTypes.SUCCESS_GET_GITHUB_REPOS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FAILURE_GET_GITHUB_REPOS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, [PAYLOAD.ERROR]: error, loading: false };
    expect(
      reposReducer(state, {
        type: reposActionTypes.FAILURE_GET_GITHUB_REPOS,
        error
      })
    ).toEqual(expectedResult);
  });
});
