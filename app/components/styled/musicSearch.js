import styled from '@emotion/styled';
import { C } from './colors';

export const SearchContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  background: ${C.inputBg};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  color: ${C.text};
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  &::placeholder {
    color: ${C.placeholder};
  }
  &:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 24px rgba(255, 107, 53, 0.12);
  }
  &:hover:not(:focus) {
    border-color: #3d3d54;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
