import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { C } from './colors';

const spinGradient = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const MusicPageWrapper = styled.div`
  min-height: 100vh;
  background: ${C.bg};
  color: ${C.text};
  padding-bottom: 100px;
  position: relative;
`;

export const MusicPageContent = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: ${C.text};
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.2);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  font-family: 'Outfit', sans-serif;
  color: ${C.muted};
  font-size: 1rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const LoadingSpinner = styled.div`
  width: 36px;
  height: 36px;
  margin: 3rem auto;
  border-radius: 50%;
  border: 3px solid ${C.border};
  border-top-color: ${C.accent};
  animation: ${spinGradient} 0.8s linear infinite;
`;
