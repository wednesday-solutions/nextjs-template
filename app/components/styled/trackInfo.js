import styled from '@emotion/styled';
import { C } from './colors';

export const TrackDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
`;

export const TrackArtworkLarge = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
`;

export const TrackMeta = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const TrackDetailName = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${C.text};
  margin: 0;
`;

export const TrackDetailArtist = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: ${C.muted};
  margin: 0;
`;

export const TrackDetailAlbum = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  color: ${C.placeholder};
  margin: 0;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Tag = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  background: ${C.surface};
  color: ${C.label};
`;

export const StoreLink = styled.a`
  font-family: 'Syne', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${C.accent};
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${C.accent};
  border-radius: 8px;
  transition: all 0.2s ease;
  &:hover {
    background: ${C.accent};
    color: #fff;
  }
`;
