import type {LoginProviders} from 'modules/login/login-types';
import LoginModule from 'modules/login/LoginModule';
import type {GetServerSideProps, NextPage} from 'next';
import {getProviders, getSession} from 'next-auth/react';

interface Props {
  providers: LoginProviders;
}

const LoginPage: NextPage<Props> = ({providers}) => {
  return <LoginModule providers={providers} />;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      title: 'Login',
      providers,
    },
  };
};
