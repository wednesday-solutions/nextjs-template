import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import colors from '@themes/colors';
import globalStyle from '@app/global-styles';
import { Global } from '@emotion/react';
import { translationMessages, DEFAULT_LOCALE } from '@app/i18n';
import { wrapper } from '@app/configureStore';
import 'antd/dist/reset.css';

const theme = {
  colors
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
