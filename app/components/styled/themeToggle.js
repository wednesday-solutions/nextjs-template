import styled from '@emotion/styled';
import { C } from './colors';

export const ToggleButton = styled.button`
  background: ${C.cardBg};
  border: 1px solid ${C.border};
  color: ${C.text};
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  &:hover {
    transform: scale(1.1);
    border-color: ${C.accent};
    box-shadow: 0 0 16px rgba(255, 107, 53, 0.2);
  }
  &:active {
    transform: scale(0.95);
  }
`;
