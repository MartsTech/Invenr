import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import {SessionProvider, useSession} from 'next-auth/react';
import {FC, ReactNode, useEffect} from 'react';
import {
  authLogin,
  authLogout,
  authSessionChanged,
  authSessionSelector,
  authSignedSelector,
} from './auth-state';
import {authSessionDifference} from './auth-utils';

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

  const signed = useStoreSelector(authSignedSelector);
  const session = useStoreSelector(authSessionSelector);

  const {data, status} = useSession();

  useEffect(() => {
    if (status === 'authenticated' && !signed) {
      dispatch(authLogin({session: data}));
    } else if (status === 'unauthenticated' && signed) {
      dispatch(authLogout());
    }
  }, [status, data, signed, dispatch]);

  useEffect(() => {
    if (signed && data && session && authSessionDifference(data, session)) {
      dispatch(authSessionChanged(data));
    }
  }, [signed, data, session, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
