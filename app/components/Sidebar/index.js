/**
 *
 * Sidebar Component
 *
 */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  background: linear-gradient(180deg, var(--color-background-secondary) 0%, var(--color-background) 100%);
  border-right: 1px solid var(--color-border);
  padding: 20px 0;
  z-index: 100;
  overflow-y: auto;
  transition:
    background var(--transition-base),
    border-color var(--transition-base);

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 180px;
  }
`;

const Logo = styled.div`
  padding: 0 20px 30px;
  font-size: 24px;
  font-weight: 600;
  font-family: var(--font-primary);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
    color: var(--color-text);
  }

  ${(props) =>
    props.$active &&
    `
    background-color: var(--color-accent);
    color: #FFFFFF;
    
    &:hover {
      background-color: var(--color-accent);
      opacity: 0.9;
    }
  `}
`;

const Icon = styled.span`
  margin-right: 12px;
  font-size: 18px;
  width: 20px;
  text-align: center;
`;

export function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/library', label: 'Library', icon: '📚' }
  ];

  return (
    <SidebarContainer data-testid="sidebar">
      <Logo>myTunes</Logo>
      <NavList>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <NavItem
              key={item.path}
              href={item.path}
              $active={isActive}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon>{item.icon}</Icon>
              {item.label}
            </NavItem>
          );
        })}
      </NavList>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
