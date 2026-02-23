import styled from '@emotion/styled';
import { C } from './colors';

export const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid ${C.border};
  color: ${C.muted};
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
    color: ${C.error};
    border-color: ${C.error};
    box-shadow: 0 0 16px rgba(255, 71, 87, 0.2);
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;
