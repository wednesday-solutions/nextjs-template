import { IntlProvider } from 'react-intl';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import colors from '@themes/colors';
import GlobalStyle from '@app/global-styles';
import { translationMessages, DEFAULT_LOCALE } from '@app/i18n';
import { wrapper } from '@app/configureStore';
import 'antd/dist/antd.css';

const theme = {
  colors
};

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        pathname: ctx.pathname
      }
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
