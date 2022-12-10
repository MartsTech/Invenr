import {useStoreSelector} from 'lib/store/store-hooks';
import {useAuthSignOutMutation} from 'modules/auth/auth-api';
import {authSessionSelector, authSignedSelector} from 'modules/auth/auth-state';
import Link from 'next/link';

const HomePage = () => {
  const signed = useStoreSelector(authSignedSelector);
  const session = useStoreSelector(authSessionSelector);

  const [authSignOut] = useAuthSignOutMutation();

  if (signed && session) {
    return (
      <div>
        <button onClick={() => authSignOut()}>Sign Out</button>
        <p>{session.user?.id}</p>
        <p>{session.user?.name}</p>
        <p>{session.user?.email}</p>
        <p>{session.user?.image}</p>
        <p>{session.expires}</p>
      </div>
    );
  }

  return <Link href="/login">Sign In</Link>;
};
export default HomePage;
