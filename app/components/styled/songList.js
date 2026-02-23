import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { C } from './colors';

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(255, 107, 53, 0.15); }
  50% { box-shadow: 0 0 18px rgba(255, 107, 53, 0.3); }
`;

export const SongListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SongCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: ${(p) => (p.isActive ? C.surface : C.cardBg)};
  border-radius: 10px;
  border-left: 3px solid ${(p) => (p.isActive ? C.accent : 'transparent')};
  cursor: pointer;
  transition: all 0.25s ease;
  animation: ${(p) => (p.isActive ? glowPulse : 'none')} 2s ease-in-out infinite;
  &:hover {
    transform: translateX(4px);
    background: ${C.surface};
  }
`;

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

export const SongTitle = styled.span`
  font-family: 'Syne', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${C.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SongArtist = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  color: ${C.muted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SongAlbum = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  color: ${C.placeholder};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
