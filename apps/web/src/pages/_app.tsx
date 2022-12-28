import {persistor, store} from 'lib/store';
import AuthProvider from 'modules/auth/AuthProvider';
import {AppLayout} from 'modules/layout/AppLayout';
import type {AppProps} from 'next/app';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'ui';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <AppLayout title={pageProps.title}>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </AuthProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
