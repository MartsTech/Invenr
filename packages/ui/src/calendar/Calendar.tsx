import {
  AppointmentModel,
  Resource,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
  Appointments,
  AppointmentTooltip,
  DayView,
  Resources,
  Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/system';
import type {FC} from 'react';

export interface CalendarAppointment extends AppointmentModel {}

export interface CalendarResource extends Resource {}

export interface CalendarProps {
  currentDate: string;
  appointments: CalendarAppointment[];
  resources: CalendarResource[];
}

export const Calendar: FC<CalendarProps> = ({
  currentDate,
  appointments,
  resources,
}) => {
  return (
    <StyledPaper>
      <Scheduler data={appointments}>
        <ViewState currentDate={currentDate} />
        <DayView />
        <Appointments />
        <AppointmentTooltip />
        <AllDayPanel />
        <Resources data={resources} />
      </Scheduler>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)({
  height: '100vh',
  overflow: 'hidden',
});

Calendar.displayName = 'Calendar';
