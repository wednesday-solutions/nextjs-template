import { PAYLOAD } from '@app/utils/reducer';
import { reposReducer, reposActionTypes, initialState } from '../reducer';

describe('Repos reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(reposReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, [PAYLOAD.DATA]: 'Mohammed Ali Chherawalla' };
    expect(
      reposReducer(initialState, {
        type: reposActionTypes.DEFAULT_ACTION,
        [PAYLOAD.DATA]: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
