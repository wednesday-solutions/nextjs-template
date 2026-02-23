const THEME_KEY = 'musica_theme';

const isBrowser = () => typeof window !== 'undefined';

export const getStoredTheme = () => {
  if (!isBrowser()) {
    return null;
  }
  return localStorage.getItem(THEME_KEY);
};

export const setStoredTheme = (theme) => {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(THEME_KEY, theme);
};
