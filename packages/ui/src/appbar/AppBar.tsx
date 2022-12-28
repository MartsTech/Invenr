import MuiMenu from '@mui/icons-material/Menu';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar, AvatarProps} from '../avatar';
import {drawerWidth} from '../drawer/drawer-utils';
import {normalizeIcon} from '../icon/icon-utils';
import {ThemeMode} from '../theme/ThemeMode';

const MenuIcon = normalizeIcon(MuiMenu);

export interface AppBarProps extends MuiAppBarProps {
  title: string;
  open: boolean;
  handleDrawerOpen: () => void;
  avatar?: AvatarProps;
}

export const AppBar: React.FC<AppBarProps> = ({
  avatar,
  title,
  open,
  handleDrawerOpen,
}) => {
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <StyledMenu
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && {display: 'none'}),
          }}>
          <MenuIcon />
        </StyledMenu>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <StyledIcons>
          <Avatar
            {...avatar}
            sx={{
              cursor: 'pointer',
              ...avatar?.sx,
            }}
          />
          <ThemeMode />
        </StyledIcons>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<{open: boolean}>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledMenu = styled(IconButton)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledIcons = styled(Box)({
  display: 'flex',
  gap: 4,
  marginLeft: 'auto',
});

AppBar.displayName = 'AppBar';
