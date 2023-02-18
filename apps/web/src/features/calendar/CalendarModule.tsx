import {styled} from '@mui/material/styles';
import {getWeekDates} from 'common/week/getWeekDays';
import {calendarListStateSelector} from 'features/calendarList/calendarList-state';
import {eventsListStateSelector} from 'features/events/events-state';
import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import {FC, useMemo} from 'react';
import {
  Box,
  Calendar,
  CalendarAppointment,
  CalendarResource,
  FloatButton,
} from 'ui';
import {
  calendarCurrentDateChanged,
  calendarCurrentDateSelector,
  calendarCurrentViewChanged,
  calendarCurrentViewSelector,
} from './calendar-state';

const CalendarModule: FC = () => {
  const calendarListState = useStoreSelector(calendarListStateSelector);
  const eventsState = useStoreSelector(eventsListStateSelector);
  const currentDate = useStoreSelector(calendarCurrentDateSelector);
  const currentView = useStoreSelector(calendarCurrentViewSelector);

  const dispatch = useStoreDispatch();

  const appointments: CalendarAppointment[] = useMemo(
    () =>
      eventsState.body?.map(
        item =>
          ({
            id: item.id,
            startDate: item.start.dateTime,
            endDate: item.end.dateTime,
            title: item.summary,
            allDay: item.allDay,
            calendarId: item.calendarId,
          } as CalendarAppointment),
      ) || [],
    [eventsState.body],
  );

  const resources: CalendarResource[] = useMemo(
    () => [
      {
        fieldName: 'calendarId',
        title: 'Calendar Id',
        instances:
          calendarListState.body?.map(item => ({
            id: item.id,
            text: item.summary,
            color: item.backgroundColor,
          })) || [],
      } as CalendarResource,
    ],
    [calendarListState.body],
  );

  return (
    <StyledContainer>
      <Calendar
        currentDate={currentDate}
        onCurrentDateChange={date => {
          console.warn(date.toISOString());

          dispatch(calendarCurrentDateChanged(date.toISOString()));
        }}
        currentViewName={currentView}
        onCurrentViewNameChange={view => {
          dispatch(calendarCurrentDateChanged(getWeekDates(currentDate).first));
          dispatch(calendarCurrentViewChanged(view));
        }}
        appointments={appointments}
        resources={resources}
      />
      <FloatButton />
    </StyledContainer>
  );
};

export default CalendarModule;

const StyledContainer = styled(Box)({
  display: 'flex',
  height: '100%',
});
