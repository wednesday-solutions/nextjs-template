import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { C } from './colors';

const heartPop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

export const HeartBtn = styled.button`
  background: transparent;
  border: none;
  color: ${(p) => (p.isLiked ? '#e84393' : C.muted)};
  font-size: 1.15rem;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  flex-shrink: 0;
  animation: ${(p) => (p.isLiked ? heartPop : 'none')} 0.35s ease;
  &:hover {
    color: #e84393;
    transform: scale(1.2);
  }
`;
