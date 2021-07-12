import { chainMethods } from '../utils';

describe('Utils tests', () => {
  it('should ensure it return when its being called ', () => {
    chainMethods({ a: 'a' }, [jest.fn()]);
  });
});
