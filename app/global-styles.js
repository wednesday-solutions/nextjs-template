import { css } from '@emotion/react';
import { colors } from './themes/index';

const globalStyle = css`
  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    display: block;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${colors.text};
  }

  body {
    p,
    label,
    span,
    div,
    h1 {
      line-height: 1.5;
      font-family: Helvetica, Arial, sans-serif;
      color: ${colors.text};
    }
  }
  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  #__next {
    height: 100%;
  }
`;

export default globalStyle;
