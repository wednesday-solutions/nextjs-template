import { setError } from '@app/utils/reducer';
import { create } from 'zustand';

const useReposState = create((set) => ({
  repos: [],
  loading: false,
  error: null,
  setRepos: (reposList) => set(() => ({ repos: reposList })),
  setError: (errorMessage) => set(() => ({ error: errorMessage }))
}));

export default useReposState;
