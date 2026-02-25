import { css } from '@emotion/react';

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
    font-family: 'Outfit', sans-serif;
    line-height: 1.5;
    color: var(--musica-text);
  }

  body {
    p,
    label,
    span,
    div,
    h1 {
      line-height: 1.5;
      font-family: 'Outfit', sans-serif;
      color: var(--musica-text);
    }
  }
  body.fontLoaded {
    font-family: 'Outfit', sans-serif;
  }

  #app {
    background-color: var(--musica-bg);
    min-height: 100%;
    min-width: 100%;
  }

  #__next {
    height: 100%;
  }
`;

export default globalStyle;
