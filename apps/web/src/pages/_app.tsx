import AuthProvider from 'features/auth/AuthProvider';
import {AppLayout} from 'features/layouts/AppLayout';
import PageProvider from 'features/page/PageProvider';
import {persistor, store} from 'lib/store';
import type {AppProps} from 'next/app';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'ui';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <PageProvider title={pageProps.title}>
              <AppLayout title={pageProps.title}>
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
