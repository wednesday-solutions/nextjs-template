/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#006ED6';
const text = '#000000';
const secondary = '#f8c49c';
const success = '#28a745';
const error = '#dc3545';
const transparent80 = 'rgba(0, 0, 0, 0.2)';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  transparent80,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};

const C = {
  bg: '#161622',
  inputBg: '#1e1e30',
  border: '#2d2d44',
  accent: '#ff6b35',
  pink: '#e84393',
  text: '#ffffff',
  muted: '#6c7086',
  label: '#9ca0b0',
  placeholder: '#4a4a5a',
  error: '#ff4757'
};

module.exports = { ...colors, C };
