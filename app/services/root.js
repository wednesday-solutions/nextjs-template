import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getReccomendations = async () => {
  const res = await repoApi.get(`/orgs/wednesday-solutions/repos?type=public`);
  const getData = (response) => {
    if (!response.ok) {
      console.error(res.data);
      return [];
    }
    // return response.data.map(({ id, name }) => ({ id, name }));
    const desired = ['react-floki', 'nextjs-template'];
    return response.data.filter(({ name }) => desired.includes(name)).map(({ id, name }) => ({ id, name }));
  };
  return getData(res);
};
