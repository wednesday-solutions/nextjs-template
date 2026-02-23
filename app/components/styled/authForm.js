import styled from '@emotion/styled';
import { C } from './colors';

export const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 3rem;
  background: ${C.bg};
  border-radius: 16px;
  border: 1px solid ${C.border};
`;

export const FormTitle = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${C.text};
  margin-bottom: 0.5rem;
`;

export const FormSubtitle = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  color: ${C.muted};
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  color: ${C.label};
  display: block;
  margin-bottom: 0.5rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  background: ${C.inputBg};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  color: ${C.text};
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  &::placeholder {
    color: ${C.placeholder};
  }
  &:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.15);
  }
  &:hover:not(:focus) {
    border-color: #3d3d54;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 1.25rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, ${C.accent}, ${C.pink});
  border: none;
  border-radius: 10px;
  color: ${C.text};
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  letter-spacing: 0.05em;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SwitchText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: ${C.muted};
  text-align: center;
  margin-top: 1.5rem;
`;

export const SwitchLink = styled.a`
  color: ${C.accent};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${C.pink};
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  color: ${C.error};
  margin-top: 0.5rem;
  text-align: center;
`;
