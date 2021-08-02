import { selectInfoLoading, selectInfoData } from '../info';

describe('info selector tests', () => {
  let loading;
  let data;
  let mockedState;

  beforeEach(() => {
    mockedState = new Map([
      [loading, false],
      [data, {}]
    ]);
  });
  it('should select the infoLoading selector', () => {
    const selectInfoLoadingSelector = selectInfoLoading();
    expect(selectInfoLoadingSelector(mockedState)).toBeFalsy();
  });
  it('should select the selectInfoData selector', () => {
    const selectInfoDataSelector = selectInfoData();
    expect(selectInfoDataSelector(mockedState)).toStrictEqual({});
  });
});
