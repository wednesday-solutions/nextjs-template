import { infoReducer, infoTypes, initialState } from '../reducer';

describe('Info reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(infoReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      infoReducer(initialState, {
        type: infoTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
