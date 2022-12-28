import CalendarIcon from '@mui/icons-material/CalendarToday';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import {styled} from '@mui/system';
import {useStoreSelector} from 'lib/store/store-hooks';
import {useAuthSignOutMutation} from 'modules/auth/auth-api';
import {authSessionSelector} from 'modules/auth/auth-state';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {AppBar, Drawer, DrawerHeader} from 'ui';

export interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({title, children}) => {
  const session = useStoreSelector(authSessionSelector);

  const [authSignOut] = useAuthSignOutMutation();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyledWrapper>
      <AppBar
        avatar={{
          src: session?.user?.image,
          show: !!session,
          dropdown: {
            items: [
              {
                label: 'Logout',
                icon: <Logout />,
                onClick: () => authSignOut(),
              },
            ],
          },
        }}
        title={title}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        items={[
          {
            label: 'Calendar',
            icon: <CalendarIcon />,
            onClick: () => router.push('/calendar'),
          },
        ]}
      />
      <StyledContainer component="main">
        <DrawerHeader />
        {children}
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)({
  height: '100vh',
  display: 'flex',
});

const StyledContainer = styled(Box)({
  padding: 3,
  height: 'calc(100% - 64px)',
});
