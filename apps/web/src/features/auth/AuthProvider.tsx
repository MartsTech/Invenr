import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import {
  reqStateDefault,
  reqStateLoading,
  reqStateSuccess,
} from 'lib/store/store-utils';
import {SessionProvider, useSession} from 'next-auth/react';
import {FC, ReactNode, useEffect} from 'react';
import {authSessionStateSelector, authSessionStateUpdated} from './auth-state';
import {authSessionTransformer} from './auth-utils';

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
};

const Provider: FC<Props> = ({children}) => {
  const dispatch = useStoreDispatch();

  const sessionState = useStoreSelector(authSessionStateSelector);

  const {data, status} = useSession();

  useEffect(() => {
    if (status === 'loading' && !sessionState.isSuccess) {
      dispatch(authSessionStateUpdated(reqStateLoading()));
    } else if (status === 'authenticated' && !sessionState.isSuccess) {
      dispatch(
        authSessionStateUpdated(reqStateSuccess(authSessionTransformer(data))),
      );
    } else if (status === 'unauthenticated' && sessionState.isSuccess) {
      dispatch(authSessionStateUpdated(reqStateDefault()));
    }
  }, [status, data, sessionState, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
