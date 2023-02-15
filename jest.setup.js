import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import { matchers } from '@emotion/jest';

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});

jest.mock('next/router', () => {
  const router = jest.requireActual('next/router');
  return {
    __esModule: true,
    ...router,
    useRouter: () => ({})
  };
});

expect.extend(matchers);
