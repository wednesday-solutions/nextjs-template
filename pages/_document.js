import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@app/utils/createEmotionCache';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          }
      });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags
    };
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

    return (
      <Html>
        <Head>{this.props.emotionStyleTags}</Head>
        <body>
          <Main />
          <Script src={polyfill} />
          <Script
            id="locale-data"
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
