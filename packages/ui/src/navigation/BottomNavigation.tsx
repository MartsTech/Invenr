import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from 'react';

export interface BottomNavigationItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface BottomNavigationProps {
  currentIndex: number;
  items: BottomNavigationItem[];
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentIndex,
  items,
  ...props
}) => {
  return (
    <MuiBottomNavigation {...props} showLabels value={currentIndex}>
      {items.map(item => (
        <BottomNavigationAction
          key={item.label}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </MuiBottomNavigation>
  );
};
