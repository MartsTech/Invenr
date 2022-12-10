import {useAuthSignInMutation} from 'modules/auth/auth-api';
import type {LoginProviders} from 'modules/login/login-types';
import type {GetServerSideProps, NextPage} from 'next';
import {getProviders} from 'next-auth/react';

interface Props {
  providers: LoginProviders;
}

const LoginPage: NextPage<Props> = ({providers}) => {
  const [authSignIn] = useAuthSignInMutation();

  return (
    <>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => authSignIn({providerId: provider.id})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
