import MuiButton from '@mui/material/Button';

export interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({title, onClick}) => {
  return (
    <MuiButton variant="contained" onClick={onClick}>
      {title}
    </MuiButton>
  );
};
