import MuiChevronLeft from '@mui/icons-material/ChevronLeft';
import MuiChevronRight from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {styled, useTheme} from '@mui/material/styles';
import {normalizeIcon} from '../icon/icon-utils';
import {closedMixin, drawerWidth, openedMixin} from './drawer-utils';
import {DrawerHeader} from './DrawerHeader';

const ChevronLeftIcon = normalizeIcon(MuiChevronLeft);
const ChevronRightIcon = normalizeIcon(MuiChevronRight);

export interface DrawerItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  items: DrawerItem[];
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  handleDrawerClose,
  items,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent" open={open} {...props}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {items.map(item => (
          <ListItem
            key={item.label}
            disablePadding
            sx={{display: 'block'}}
            onClick={item.onClick}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

Drawer.displayName = 'Drawer';
