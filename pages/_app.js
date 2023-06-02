import { IntlProvider } from 'react-intl';
import App from 'next/app';
import colors from '@themes/colors';
import globalStyle from '@app/global-styles';
import { Global, CacheProvider } from '@emotion/react';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { translationMessages, DEFAULT_LOCALE } from '@app/i18n';
import { wrapper } from '@app/configureStore';
import createEmotionCache from '@app/utils/createEmotionCache';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  }
});

const clientSideEmotionCache = createEmotionCache();

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        pathname: ctx.pathname
      },
      clientSideEmotionCache
    };
  };

  render() {
    const { Component, pageProps, clientSideEmotionCache } = this.props;
    return (
      <CacheProvider value={clientSideEmotionCache}>
        <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
          <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
              <CssBaseline />
              <Global style={globalStyle} />
              <Container>
                <Component {...pageProps} />
              </Container>
            </MUIThemeProvider>
          </StyledEngineProvider>
        </IntlProvider>
      </CacheProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
