import {styled} from '@mui/material';
import MuiBottomNavigation, {
  BottomNavigationProps as MuiButtomNavigationProps,
} from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from 'react';

export interface BottomNavigationItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface BottomNavigationProps extends MuiButtomNavigationProps {
  currentIndex: number;
  items: BottomNavigationItem[];
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentIndex,
  items,
  ...props
}) => {
  return (
    <StyledBottomNavigation {...props} showLabels value={currentIndex}>
      {items.map(item => (
        <BottomNavigationAction
          key={item.label}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </StyledBottomNavigation>
  );
};

const StyledBottomNavigation = styled(MuiBottomNavigation)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
`;
