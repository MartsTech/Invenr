import MuiBox, {BoxProps as MuiBoxProps} from '@mui/material/Box';

export interface BoxProps extends MuiBoxProps {}

export const Box: React.FC<BoxProps> = ({children, ...props}) => {
  return <MuiBox {...props}>{children}</MuiBox>;
};
