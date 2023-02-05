import {
  AppointmentModel,
  Resource,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/system';
import {FC} from 'react';
import {CalendarTimeIndicator} from './CalendarTimeIndicator';

export interface CalendarAppointment extends AppointmentModel {}

export interface CalendarResource extends Resource {}

export interface CalendarProps {
  currentDate: string;
  onCurrentDateChange: (date: Date) => void;
  currentViewName: string;
  onCurrentViewNameChange: (viewName: string) => void;
  appointments: CalendarAppointment[];
  resources: CalendarResource[];
}

export const Calendar: FC<CalendarProps> = ({
  currentDate,
  onCurrentDateChange,
  currentViewName,
  onCurrentViewNameChange,
  appointments,
  resources,
}) => {
  return (
    <StyledPaper>
      <Scheduler data={appointments}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={onCurrentDateChange}
          currentViewName={currentViewName}
          onCurrentViewNameChange={onCurrentViewNameChange}
        />
        <DayView />
        <WeekView />
        <Appointments />
        <AppointmentTooltip />
        <AllDayPanel />
        <Resources data={resources} />
        <CurrentTimeIndicator indicatorComponent={CalendarTimeIndicator} />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)({
  '& .Container-container': {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',

    '& ::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

Calendar.displayName = 'Calendar';
