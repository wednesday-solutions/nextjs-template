import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import PropTypes from 'prop-types';
const MyDocument = ({ localeDataScript, locale, styles }) => {
  // Polyfill Intl API for older browsers
  const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${locale}`;

  return (
    <Html>
      <Head />
      <body>
        <Main />
        <Script src={polyfill} />
        <Script
          id="locale-data"
          dangerouslySetInnerHTML={{
            __html: localeDataScript
          }}
        />
        <NextScript />
        {styles}
      </body>
    </Html>
  );
};

MyDocument.propTypes = {
  localeDataScript: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  styles: PropTypes.node.isRequired
};

MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      )
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
