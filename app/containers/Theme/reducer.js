/*
 *
 * Theme reducer
 *
 */
import { createActions } from 'reduxsauce';
import produce from 'immer';

export const THEME_PAYLOAD = {
  THEME: 'theme'
};

export const initialState = {
  theme: 'light' // 'light' or 'dark'
};

export const { Types: themeActionTypes, Creators: themeActionCreators } = createActions({
  setTheme: [THEME_PAYLOAD.THEME],
  toggleTheme: null
});

function persistTheme(theme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function themeReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case themeActionTypes.SET_THEME:
        draft.theme = action.theme;
        persistTheme(action.theme);
        break;
      case themeActionTypes.TOGGLE_THEME: {
        const newTheme = draft.theme === 'light' ? 'dark' : 'light';
        draft.theme = newTheme;
        persistTheme(newTheme);
        break;
      }
      default:
        break;
    }
  });
}

export default themeReducer;
