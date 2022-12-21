import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import {SessionProvider, useSession} from 'next-auth/react';
import {FC, ReactNode, useEffect} from 'react';
import {authLogin, authLogout, authSignedSelector} from './auth-state';
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

  const signed = useStoreSelector(authSignedSelector);

  const {data, status} = useSession();

  useEffect(() => {
    if (status === 'authenticated' && !signed) {
      dispatch(authLogin({session: authSessionTransformer(data)}));
    } else if (status === 'unauthenticated' && signed) {
      dispatch(authLogout());
    }
  }, [status, data, signed, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
