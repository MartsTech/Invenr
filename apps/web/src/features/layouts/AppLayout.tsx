import CalendarIcon from '@mui/icons-material/CalendarToday';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import {styled} from '@mui/system';
import {useAuthSignOutMutation} from 'features/auth/auth-api';
import {authSessionStateSelector} from 'features/auth/auth-state';
import {useStoreSelector} from 'lib/store/store-hooks';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';
import {AppBar, BottomNavigation, Drawer, DrawerHeader} from 'ui';

export interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({title, children}) => {
  const sessionState = useStoreSelector(authSessionStateSelector);

  const [authSignOut] = useAuthSignOutMutation();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigationItems = useMemo(
    () => [
      {
        label: 'Calendar',
        icon: <CalendarIcon />,
        onClick: () => router.push('/calendar'),
      },
    ],
    [router],
  );

  const currentNavigationIndex = useMemo(() => {
    return navigationItems.findIndex(
      item => item.label.toLowerCase() === router.pathname.slice(1),
    );
  }, [navigationItems, router.pathname]);

  return (
    <StyledWrapper>
      <AppBar
        avatar={{
          src: sessionState.body?.user?.image,
          show: sessionState.isSuccess,
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
      <StyledDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        items={navigationItems}
      />
      <StyledContainer component="main">
        <DrawerHeader />
        {children}
        <StyledBottomNavigation
          items={navigationItems}
          currentIndex={currentNavigationIndex}
        />
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
});

const StyledDrawer = styled(Drawer)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled(Box)(({theme}) => ({
  padding: 3,
  height: 'calc(100% - 64px)',
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    height: 'calc(100% - 110px)',
  },
}));

const StyledBottomNavigation = styled(BottomNavigation)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
