import {CurrentTimeIndicator} from '@devexpress/dx-react-scheduler-material-ui';
import Box from '@mui/material/Box';
import React from 'react';

export interface CalendarTimeIndicatorProps
  extends CurrentTimeIndicator.IndicatorProps {}

export const CalendarTimeIndicator: React.FC<CalendarTimeIndicatorProps> = ({
  top,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [top]);

  return (
    <Box component="div" ref={ref} sx={{marginTop: '-150px'}}>
      <CurrentTimeIndicator.Indicator top={top} {...props} />
    </Box>
  );
};
