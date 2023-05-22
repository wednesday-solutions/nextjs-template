import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getRepos = (repoUrl) => repoApi.get(repoUrl);
