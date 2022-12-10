import {useStoreSelector} from 'lib/store/store-hooks';
import {
  useAuthSignInMutation,
  useAuthSignOutMutation,
} from 'modules/auth/auth-api';
import {authSessionSelector, authSignedSelector} from 'modules/auth/auth-state';

const HomePage = () => {
  const signed = useStoreSelector(authSignedSelector);
  const session = useStoreSelector(authSessionSelector);

  const [authSignIn] = useAuthSignInMutation();
  const [authSignOut] = useAuthSignOutMutation();

  if (signed && session) {
    return (
      <div>
        <button onClick={() => authSignOut()}>Sign Out</button>
        <p>{session.expires}</p>
        <p>{session.user?.email}</p>
        <p>{session.user?.image}</p>
        <p>{session.user?.name}</p>
        <p>{session.accessToken}</p>
        <p>{session.accessTokenExpires}</p>
        <p>{session.refreshToken}</p>
      </div>
    );
  }

  return <button onClick={() => authSignIn()}>Sign In</button>;
};
export default HomePage;
