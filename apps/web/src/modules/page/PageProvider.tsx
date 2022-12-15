import {useStoreSelector} from 'lib/store/store-hooks';
import {authSignedSelector} from 'modules/auth/auth-state';
import {useRouter} from 'next/router';
import {FC, ReactNode, useEffect} from 'react';

interface Props {
  children: ReactNode;
}

const PageProvider: FC<Props> = ({children}) => {
  const signed = useStoreSelector(authSignedSelector);

  const rounter = useRouter();

  useEffect(() => {
    if (!signed && rounter.pathname !== '/login') {
      rounter.push('/login');
    } else if (signed && rounter.pathname === '/login') {
      rounter.push('/');
    }
  }, [signed, rounter]);

  return <>{children}</>;
};

export default PageProvider;
