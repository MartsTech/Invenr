import {persistor, store} from 'lib/store';
import AuthProvider from 'modules/auth/AuthProvider';
import {AppLayout} from 'modules/layout/AppLayout';
import PageProvider from 'modules/page/PageProvider';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'ui';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <PageProvider title={pageProps.title}>
              <AppLayout title={pageProps.title}>
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                  />
                </Head>
                <Component {...pageProps} />
              </AppLayout>
            </PageProvider>
          </ThemeProvider>
        </AuthProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
