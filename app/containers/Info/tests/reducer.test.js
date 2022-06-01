import { infoReducer, infoTypes, initialState } from '../reducer';

describe('Info reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(infoReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_INFO is dispatched', () => {
    const expectedResult = { ...state, loading: true };
    expect(
      infoReducer(state, {
        type: infoTypes.REQUEST_INFO
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and loading = false when SUCCESS_INFO is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, data, loading: false };
    expect(
      infoReducer(state, {
        type: infoTypes.SUCCESS_INFO,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and loading = false when FAILURE_INFO is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error, loading: false };
    expect(
      infoReducer(state, {
        type: infoTypes.FAILURE_INFO,
        error
      })
    ).toEqual(expectedResult);
  });
});
