import styled from '@emotion/styled';
import { C } from './colors';

export const ArtworkWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  &:hover > [data-overlay] {
    opacity: 1;
  }
`;

export const Artwork = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  opacity: ${(p) => (p.isActive ? 1 : 0)};
  transition: opacity 0.2s ease;
  font-size: 1.4rem;
  color: ${C.accent};
`;
