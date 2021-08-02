import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getRepo = async (repo, owner = 'wednesday-solutions') => {
  if (!repo) {
    throw new Error('repo unavailable');
  }
  const res = await repoApi.get(`/repos/${owner}/${repo}`);
  const getData = (response) => {
    if (!response.ok) {
      return [];
    }
    return response.data;
  };
  return getData(res);
};
