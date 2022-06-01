import { selectReposSearchKey, selectReposData, selectReposError } from '../selectors';

describe('app selector tests', () => {
  let mockedState;
  let searchKey;
  let reposData;
  let reposError;

  beforeEach(() => {
    searchKey = 'mac';
    reposData = { totalCount: 1, items: [{ searchKey }] };
    reposError = 'There was some error while fetching the repository details';

    mockedState = {
      repos: {
        searchKey,
        data: reposData,
        error: reposError
      }
    };
  });

  it('should select the repoName', () => {
    const repoSelector = selectReposSearchKey();
    expect(repoSelector(mockedState)).toEqual(searchKey);
  });

  it('should select reposData', () => {
    const reposDataSelector = selectReposData();
    expect(reposDataSelector(mockedState)).toEqual(reposData);
  });

  it('should select the reposError', () => {
    const reposErrorSelector = selectReposError();
    expect(reposErrorSelector(mockedState)).toEqual(reposError);
  });
});
