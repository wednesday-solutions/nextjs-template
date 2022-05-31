import { chainMethods } from '../../../utils/reducer';

describe('Utils tests', () => {
  const setter = jest.fn().mockImplementation((input) => {
    input.a = 'a.1';
    return input;
  });
  const chainedSetter = jest.fn();
  it('should ensure it invokes a setter', () => {
    chainMethods({ a: 'a' }, [setter]);
    expect(setter).toHaveBeenCalledWith({ a: 'a.1' });
  });

  it('should ensure that it passes the updated input to a chained setter ', () => {
    chainMethods({ a: 'a' }, [setter, [chainedSetter, { b: 'b' }]]);
    expect(setter).toHaveBeenLastCalledWith({ a: 'a.1' });
    expect(chainedSetter).toHaveBeenLastCalledWith({ a: 'a.1' }, { b: 'b' });
  });
});
