/**
 *
 * ThemeToggle Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { themeActionCreators } from '@app/containers/Theme/reducer';
import { selectTheme } from '@app/containers/Theme/selectors';

const ToggleButton = styled.button`
  background: var(--color-accent-muted);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--color-text);
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  font-family: inherit;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function ThemeToggle({ theme, onToggle }) {
  return (
    <ToggleButton
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      data-testid="theme-toggle"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </ToggleButton>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme()
});

const mapDispatchToProps = (dispatch) => ({
  onToggle: () => dispatch(themeActionCreators.toggleTheme())
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
