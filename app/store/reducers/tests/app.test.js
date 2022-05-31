import { appReducer, initialState, appTypes } from '../../../containers/Repos/reducer';

/* eslint-disable default-case, no-param-reassign */
describe('App reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const repoName = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, repoName };
    expect(
      appReducer(state, {
        type: appTypes.REQUEST_GET_GITHUB_REPOS,
        repoName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, reposData: data };
    expect(
      appReducer(state, {
        type: appTypes.SUCCESS_GET_GITHUB_REPOS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, reposError: error };
    expect(
      appReducer(state, {
        type: appTypes.FAILURE_GET_GITHUB_REPOS,
        error
      })
    ).toEqual(expectedResult);
  });
});
