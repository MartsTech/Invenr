import MuiBrightness4 from '@mui/icons-material/Brightness4';
import MuiBrightness7 from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/system/styled';
import React from 'react';
import {normalizeIcon} from '../icon/icon-utils';
import {useThemeContext} from './ThemeContext';

const Brightness4Icon = normalizeIcon(MuiBrightness4);
const Brightness7Icon = normalizeIcon(MuiBrightness7);

export const ThemeMode: React.FC = () => {
  const {themeMode, toggleTheme} = useThemeContext();

  return (
    <StyledBox>
      <IconButton sx={{ml: 1}} onClick={toggleTheme} color="inherit">
        {themeMode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.default',
  color: 'text.primary',
  borderRadius: 1,
  p: 3,
});
