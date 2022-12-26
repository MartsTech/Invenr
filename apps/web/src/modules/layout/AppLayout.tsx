import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {useState} from 'react';
import {AppBar, Drawer, DrawerHeader} from 'ui';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
