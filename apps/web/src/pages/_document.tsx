import NextDocument, {Head, Html, Main, NextScript} from 'next/document';
import {createElement} from 'react';

export const APP_NAME = 'Invenr';
export const APP_DESCRIPTION =
  'Invenr is a web application for managing your calendar';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {createElement(
            'script',
            {},
            `
            const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || false;
            const manifest = document.getElementById('manifest');
            
            function switchIcon(usesDarkMode) {
              if (usesDarkMode) { 
                manifest.href='%PUBLIC_URL%/manifest-dark.json' 
              } else {
                manifest.href='%PUBLIC_URL%/manifest.json' 
              }
            }
              
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener( "change", (e) => switchIcon(e.matches));
            switchIcon(usesDarkMode);`,
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
