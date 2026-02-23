const TOKEN_KEY = 'musica_access_token';

const isBrowser = () => typeof window !== 'undefined';

export const getStoredToken = () => {
  if (!isBrowser()) {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token) => {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  if (!isBrowser()) {
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
};
