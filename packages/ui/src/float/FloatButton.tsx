import MoreVert from '@mui/icons-material/MoreVert';
import {Fab, Menu, MenuItem, styled} from '@mui/material';
import React from 'react';
import {normalizeIcon} from '../icon/icon-utils';

const MoreVertIcon = normalizeIcon(MoreVert);

export interface FloatButtonProps {
  items: FloatButtonItem[];
}

export interface FloatButtonItem {
  label: string;
  onClick: () => void;
}

export const FloatButton: React.FC<FloatButtonProps> = ({items}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledFloat color="primary" onClick={handleClick}>
        <MoreVertIcon />
      </StyledFloat>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {items.map(item => (
          <StyledMenuItem
            key={item.label}
            onClick={() => {
              handleClose();
              item.onClick();
            }}>
            {item.label}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

const StyledFloat = styled(Fab)(({theme}) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  animation: `$float 2s ${theme.transitions.easing.easeInOut} infinite`,

  '@keyframes float': {
    '0%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}));

const StyledMenu = styled(Menu)(({theme}) => ({
  marginRight: theme.spacing(8),
  animation: `$fade 0.5s ${theme.transitions.easing.easeInOut}`,

  '@keyframes fade': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
  animation: `$fade 1s ${theme.transitions.easing.easeInOut}`,

  '@keyframes fade': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));
