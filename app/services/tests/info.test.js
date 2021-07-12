import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';

describe('info tests', () => {
  it('should ensure it throws err when ther is not any repo', () => {
    const { getRepo } = require('../info');
    const repoErr = getRepo();
    return expect(repoErr).rejects.toEqual(new Error('repo unavailable'));
  });

  it('should ensure it returns data when response is ok', async () => {
    const { getRepo } = require('../info');
    const repo = 'am';
    const owner = 'wednesday';
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const resData = ['as'];
    mock.onGet(`/repos/${owner}/${repo}`).reply(200, resData);
    const res = await getRepo(repo, owner);
    expect(res).toStrictEqual(resData);
  });
  it('should ensure it returns an empty array when err coming in response ', async () => {
    const { getRepo } = require('../info');
    const repo = 'am';
    const owner = 'wednesday';
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const resData = {};
    mock.onGet(`/repos/${owner}/${repo}`).reply(404, resData);
    const res = await getRepo(repo, owner);
    expect(res).toStrictEqual([]);
  });
});
