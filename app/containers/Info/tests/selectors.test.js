import { selectInfoLoading, selectInfoData } from '../selectors';

describe('info selector tests', () => {
  let loading;
  let data;
  let mockedState;

  beforeEach(() => {
    loading = true;
    data = {
      test: 'passed!'
    };
    mockedState = {
      info: {
        loading,
        data
      }
    };
  });
  it('should select the infoLoading selector', () => {
    const selectInfoLoadingSelector = selectInfoLoading();
    expect(selectInfoLoadingSelector(mockedState)).toBeTruthy();
  });
  it('should select the selectInfoData selector', () => {
    const selectInfoDataSelector = selectInfoData();
    expect(selectInfoDataSelector(mockedState)).toStrictEqual(data);
  });
});
