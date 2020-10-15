import { makeSelectApp, selectLoading } from '../app';

describe('App selector tests', () => {
  let mockedState;
  const loading = false;
  const error = null;
  beforeEach(() => {
    mockedState = {
      app: {
        loading,
        error
      }
    };
  });

  it('should select the loading state', () => {
    const selector = selectLoading();
    expect(selector(mockedState)).toEqual(loading);
  });
  it('should select the app state', () => {
    const selector = makeSelectApp();
    expect(selector(mockedState)).toEqual({ loading, error });
  });
});
