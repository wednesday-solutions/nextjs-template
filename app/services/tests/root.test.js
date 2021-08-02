import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';

describe('root tests', () => {
  it('should ensure it returns data when response is ok', async () => {
    const { getReccomendations } = require('../root');
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const resData = [{ id: 1, name: 'react-floki' }];
    mock.onGet(`/orgs/wednesday-solutions/repos?type=public`).reply(200, resData);
    const res = await getReccomendations();
    expect(res).toEqual(resData);
  });

  it('should ensure it returns an empty array when err coming in response ', async () => {
    const { getReccomendations } = require('../root');
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const resData = { data: ['as'] };
    mock.onGet(`/orgs/wednesday-solutions/repos?type=public`).reply(404, resData);
    const res = await getReccomendations();
    expect(res).toStrictEqual([]);
  });
});
