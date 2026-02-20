/**
 *
 * Layout Component
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Sidebar from '@app/components/Sidebar/index';
import SearchBar from '@app/components/SearchBar';
import ThemeToggle from '@app/components/ThemeToggle';
import { selectTheme } from '@app/containers/Theme/selectors';
import { themeActionCreators } from '@app/containers/Theme/reducer';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: transparent;
  transition: background-color var(--transition-base);
`;

const MainContent = styled.main`
  margin-left: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 80px; /* Space for fixed player */

  @media (max-width: 768px) {
    margin-left: 200px;
  }

  @media (max-width: 480px) {
    margin-left: 180px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-background) 0%, transparent 100%);
  transition:
    background var(--transition-base),
    border-color var(--transition-base);
  gap: 16px;
  flex-wrap: wrap;
  min-height: 60px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

export function Layout({ children, showSearchBar = true, theme, initializeTheme }) {
  useEffect(() => {
    // Initialize theme from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme !== theme) {
        initializeTheme(savedTheme);
      }
    }
  }, []);

  return (
    <LayoutContainer data-testid="layout">
      <Sidebar />
      <MainContent>
        <Header>
          {showSearchBar && <SearchBar />}
          <ThemeToggle />
        </Header>
        <ContentArea id="main-scroll-area">{children}</ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showSearchBar: PropTypes.bool,
  theme: PropTypes.string,
  initializeTheme: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme()
});

const mapDispatchToProps = (dispatch) => ({
  initializeTheme: (theme) => dispatch(themeActionCreators.setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
