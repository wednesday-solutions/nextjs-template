import styled from '@emotion/styled';
import { C } from './colors';

export const NavLinkStyled = styled.a`
  font-family: 'Syne', sans-serif;
  font-size: 0.9rem;
  font-weight: ${(p) => (p.isActive ? '700' : '500')};
  color: ${(p) => (p.isActive ? C.accent : C.muted)};
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-bottom: 2px solid ${(p) => (p.isActive ? C.accent : 'transparent')};
  transition: all 0.25s ease;
  &:hover {
    color: ${C.accent};
  }
`;

export const NavGroup = styled.nav`
  display: flex;
  gap: 0.25rem;
  margin-left: 1.5rem;
`;
