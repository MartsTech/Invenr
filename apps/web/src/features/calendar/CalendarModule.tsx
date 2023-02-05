import {styled} from '@mui/material/styles';
import {calendarListStateSelector} from 'features/calendarList/calendarList-state';
import {eventsListStateSelector} from 'features/events/events-state';
import {useStoreSelector} from 'lib/store/store-hooks';
import {FC, useMemo} from 'react';
import {Box, Calendar, CalendarAppointment, CalendarResource} from 'ui';

const CalendarModule: FC = () => {
  const calendarListState = useStoreSelector(calendarListStateSelector);
  const eventsState = useStoreSelector(eventsListStateSelector);

  const currentDate: string = useMemo(() => new Date().toISOString(), []);

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
