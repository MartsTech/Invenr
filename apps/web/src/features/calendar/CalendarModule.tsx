import {styled} from '@mui/material/styles';
import {calendarListStateSelector} from 'features/calendarList/calendarList-state';
import {eventsListStateSelector} from 'features/events/events-state';
import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import {FC, useMemo} from 'react';
import {Box, Calendar, CalendarAppointment, CalendarResource} from 'ui';
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
    [eventsState],
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
    [calendarListState],
  );

  return (
    <StyledContainer>
      <Calendar
        currentDate={currentDate}
        onCurrentDateChange={date =>
          dispatch(calendarCurrentDateChanged(date.toISOString()))
        }
        currentViewName={currentView}
        onCurrentViewNameChange={view =>
          dispatch(calendarCurrentViewChanged(view))
        }
        appointments={appointments}
        resources={resources}
      />
    </StyledContainer>
  );
};

export default CalendarModule;

const StyledContainer = styled(Box)({
  display: 'flex',
  height: '100%',
});
