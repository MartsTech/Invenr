import {EventTracker} from '@devexpress/dx-react-chart';
import {
  Chart,
  Legend,
  PieSeries,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {calendarListStateSelector} from 'features/calendarList/calendarList-state';
import {eventsListStateSelector} from 'features/events/events-state';
import {useStoreSelector} from 'lib/store/store-hooks';
import {useMemo} from 'react';
import {Box} from 'ui';

const DashboardModule = () => {
  const calendarList = useStoreSelector(calendarListStateSelector);
  const events = useStoreSelector(eventsListStateSelector);

  const first = useMemo(() => {
    let calendars: {[key: string]: {count: number}} = {};

    events.body?.forEach(event => {
      if (!calendars[event.calendarId]) {
        calendars[event.calendarId] = {
          count: 0,
        };
      }
      calendars[event.calendarId].count++;
    });

    return Object.entries(calendars).map(([name, {count}]) => ({
      name: calendarList.body?.find(calendar => calendar.id === name)?.summary,
      count,
    }));
  }, [events, calendarList]);

  return (
    <Paper>
      <StyledWrapper>
        <StyledContainer>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={new Date().toISOString()}
              onChange={() => console.log('change')}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </StyledContainer>
        <StyledContainer>
          <Chart data={first}>
            <Title text={'All Calendars'} />
            <PieSeries
              name="All Calendars"
              valueField="count"
              argumentField="name"
            />
            <Legend />
            <EventTracker />
            <Tooltip />
          </Chart>
        </StyledContainer>
      </StyledWrapper>
    </Paper>
  );
};

export default DashboardModule;

const StyledWrapper = styled(Paper)(({theme}) => ({
  display: 'flex',
  flex: 1,
  padding: '1rem',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    padding: 0,
  },
}));

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 0.5,
  justifyContent: 'center',
});
