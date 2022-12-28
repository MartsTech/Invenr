import MuiMenu from '@mui/icons-material/Menu';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar, AvatarProps} from '../avatar';
import {drawerWidth} from '../drawer/drawer-utils';
import {normalizeIcon} from '../icon/icon-utils';

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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && {display: 'none'}),
          }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <Avatar
          {...avatar}
          sx={{
            marginLeft: 'auto',
            cursor: 'pointer',
            ...avatar?.sx,
          }}
        />
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

AppBar.displayName = 'AppBar';
