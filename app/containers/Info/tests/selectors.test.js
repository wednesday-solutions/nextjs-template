import { selectInfo, selectSomePayLoad } from '../selectors';

describe('Info selector tests', () => {
  const mockedState = {
    info: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the info state', () => {
    const infoSelector = selectInfo();
    expect(infoSelector(mockedState)).toEqual(mockedState.info);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.info.somePayLoad);
  });
});
