import {SxProps, Theme} from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/system/styled';
import React from 'react';
import {Dropdown, DropdownProps} from '../dropdown/Dropdown';

export interface AvatarProps {
  src?: string;
  sx?: SxProps<Theme>;
  show?: boolean;
  dropdown?: {
    items: DropdownProps['items'];
  };
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  show = true,
  sx,
  dropdown,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        sx={sx as any}
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        <StyledAvatar src={src} />
      </StyledIconButton>
      {typeof dropdown !== 'undefined' && (
        <Dropdown
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          items={dropdown.items}
        />
      )}
    </>
  );
};

const StyledIconButton = styled(IconButton)({
  ml: 2,
});

const StyledAvatar = styled(MuiAvatar)({
  marginLeft: 'auto',
  cursor: 'pointer',
  height: 32,
  width: 32,
});
