import {AppointmentModel, ViewState} from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  DayView,
  Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import type {FC} from 'react';

export interface CalendarProps {
  data: AppointmentModel[];
  currentDate: number;
}

export const Calendar: FC<CalendarProps> = ({data, currentDate}) => {
  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

Calendar.displayName = 'Calendar';
