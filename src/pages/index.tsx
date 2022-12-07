import {useStoreSelector} from 'lib/store/store-hooks';
import {
  useAuthSignInMutation,
  useAuthSignOutMutation,
} from 'modules/auth/auth-api';
import {authSignedSelector} from 'modules/auth/auth-state';

const HomePage = () => {
  const signed = useStoreSelector(authSignedSelector);

  const [authSignIn] = useAuthSignInMutation();
  const [authSignOut] = useAuthSignOutMutation();

  if (signed) {
    return <button onClick={() => authSignOut()}>Sign Out</button>;
  }

  return <button onClick={() => authSignIn()}>Sign In</button>;
};
export default HomePage;
