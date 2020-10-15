import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    display: block;
  }
  
  body {
      p, label, span, div, h1  {
        line-height: 1.5;
        font-family: Helvetica, Arial, sans-serif;
        color: ${({ theme }) => theme.colors.text};
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
  p,
  label {
    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }

  #__next{
    height: 100%;
  }
`;

export default GlobalStyle;
