import styled from '@mui/system/styled';
import {useAuthSignInMutation} from 'features/auth/auth-api';
import type {FC} from 'react';
import {Box, Button} from 'ui';
import type {LoginProviders} from './login-types';

interface Props {
  providers: LoginProviders;
}

const LoginModule: FC<Props> = ({providers}) => {
  const [authSignIn] = useAuthSignInMutation();

  return (
    <StyledContainer>
      {Object.values(providers).map(provider => (
        <Button
          key={provider.name}
          title={`Sign in with ${provider.name}`}
          onClick={() => authSignIn({providerId: provider.id})}
        />
      ))}
    </StyledContainer>
  );
};

export default LoginModule;

const StyledContainer = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
