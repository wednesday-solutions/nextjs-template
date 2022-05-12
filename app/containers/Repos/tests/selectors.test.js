import { selectRepos, selectSomePayLoad } from '../selectors';

describe('Repos selector tests', () => {
  const mockedState = {
    repos: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the repos state', () => {
    const reposSelector = selectRepos();
    expect(reposSelector(mockedState)).toEqual(mockedState.repos);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.repos.somePayLoad);
  });
});
