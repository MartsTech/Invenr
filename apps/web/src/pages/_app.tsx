import {persistor, store} from 'lib/store';
import AuthProvider from 'modules/auth/AuthProvider';
import type {AppProps} from 'next/app';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
