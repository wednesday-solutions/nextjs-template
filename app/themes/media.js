import { css } from 'styled-components';
export const screenSizes = {
  extraLargeDesktop: 1920,
  largeDesktop: 1440,
  desktop: 1025,
  largeTablet: 865,
  tablet: 768,
  largeMobile: 480,
  mobile: 320,
  iPhonePlus: 400
};
// iterate through sizes and create a media template
export default Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = {
    min: (args) =>
      css`
        @media (min-width: ${screenSizes[label] / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', ''),
    max: (args) =>
      css`
        @media (max-width: ${screenSizes[label] / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', '')
  };
  return acc;
}, {});
