// import produce from 'immer'
import { appReducer, appTypes, initialState } from '../app';

/* eslint-disable default-case, no-param-reassign */
describe('App reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type SET_LOADINGs is dispatched', () => {
    const loading = false;
    const expectedResult = { ...state, loading };
    expect(
      appReducer(state, {
        type: appTypes.SET_LOADING,
        loading
      })
    ).toEqual(expectedResult);
  });

  it('should return the update the state when an action of type SET_ERROR is dispatched', () => {
    const error = 'Server Error';
    const expectedResult = { ...state, error };
    expect(
      appReducer(state, {
        type: appTypes.SET_ERROR,
        error
      })
    ).toEqual(expectedResult);
  });
});
