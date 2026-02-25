import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { C } from './colors';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.08); opacity: 0.35; }
`;

const equalize = keyframes`
  0%, 100% { height: 15%; }
  25% { height: 55%; }
  50% { height: 85%; }
  75% { height: 35%; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  100% { transform: translateY(-280px) rotate(40deg); opacity: 0; }
`;

export const VinylRecord = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #1a1a2e 0%,
    #0d0d0d 20%,
    #2d1b4e 21%,
    #0d0d0d 40%,
    #2d1b4e 41%,
    #0d0d0d 60%,
    #2d1b4e 61%,
    #0d0d0d 80%,
    #1a1a2e 100%
  );
  animation: ${spin} 8s linear infinite;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 60px rgba(255, 107, 53, 0.12);
  cursor: pointer;
  transition: box-shadow 0.4s ease;
  &:hover {
    animation-duration: 2s;
    box-shadow: 0 0 90px rgba(232, 67, 147, 0.25);
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: radial-gradient(circle, #ff6b35 0%, #e84393 100%);
    box-shadow: 0 0 25px rgba(255, 107, 53, 0.5);
  }
`;

export const GlowRing = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  border: 1px solid rgba(255, 107, 53, 0.08);
  animation: ${pulse} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export const EqualizerWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 100px;
  position: absolute;
  bottom: 70px;
  z-index: 1;
`;

export const EqualizerBar = styled.div`
  width: 4px;
  height: 15%;
  background: linear-gradient(to top, #ff6b35, #e84393);
  border-radius: 2px;
  animation: ${equalize} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const FloatingNote = styled.div`
  position: absolute;
  font-size: ${(props) => props.size}px;
  color: rgba(255, 107, 53, 0.35);
  animation: ${floatUp} ${(props) => props.duration}s ease-out infinite;
  animation-delay: ${(props) => props.delay}s;
  left: ${(props) => props.left}%;
  bottom: ${(props) => props.bottom}%;
  user-select: none;
`;

export const BrandText = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: ${C.text};
  margin-bottom: 0.5rem;
  z-index: 3;
  text-shadow: 0 0 40px rgba(255, 107, 53, 0.25);
`;

export const TaglineText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  color: ${C.muted};
  letter-spacing: 0.25em;
  z-index: 3;
  margin-top: 0;
  margin-bottom: 2.5rem;
`;
