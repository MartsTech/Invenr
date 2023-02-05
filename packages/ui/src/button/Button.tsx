import MuiButton, {ButtonProps as MuiButtonProps} from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
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
