import styled from '@emotion/styled';
import { C } from './colors';

export const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${C.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    color: ${C.accent};
    transform: translateX(-2px);
  }
`;
