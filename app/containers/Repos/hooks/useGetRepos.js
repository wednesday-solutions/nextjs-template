import { getRepos } from '@app/services/repoApi';
import useSWR from 'swr';
import useReposState from '../useReposState';
import { isEmpty } from 'lodash';

const useGetRepos = (repoName) => {
  const { data, isLoading, error, isError } = useSWR(`/search/repositories?q=${repoName}`, getRepos);
  const setRepos = useReposState((state) => state.setRepos);
  const setError = useReposState((state) => state.setError);

  if (!isLoading && !isEmpty(data)) {
    setRepos(data.items);
  }

  if (isError && error) {
    setError(error);
  }

  return {
    isLoading
  };
};

export default useGetRepos;
