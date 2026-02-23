import React, { createContext, useContext, useState, useMemo } from 'react';
import { Global, css } from '@emotion/react';
import PropTypes from 'prop-types';
import { getStoredTheme, setStoredTheme } from '@utils/themeStorage';
import { THEME_DARK, THEME_LIGHT, darkPalette, lightPalette, paletteToCSSVars } from '@app/themes/palettes';

const ThemeContext = createContext();

const palettes = {
  [THEME_DARK]: darkPalette,
  [THEME_LIGHT]: lightPalette
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => getStoredTheme() || THEME_DARK);

  const toggleTheme = () => {
    const next = themeMode === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setThemeMode(next);
    setStoredTheme(next);
  };

  const cssVars = useMemo(
    () => css`
      body {
        ${paletteToCSSVars(palettes[themeMode])}
      }
    `,
    [themeMode]
  );

  const value = useMemo(() => ({ themeMode, toggleTheme }), [themeMode]);

  return (
    <ThemeContext.Provider value={value}>
      <Global styles={cssVars} />
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTheme = () => useContext(ThemeContext);
