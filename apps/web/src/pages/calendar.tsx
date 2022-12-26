import PageProvider from 'modules/page/PageProvider';
import type {NextPage} from 'next';
import {Calendar} from 'ui';

const CalendarPage: NextPage = () => {
  return (
    <PageProvider>
      <Calendar
        data={[
          {
            startDate: '2022-12-26T09:45',
            endDate: '2022-12-26T11:00',
            title: 'Meeting',
          },
          {
            startDate: '2022-12-26T12:00',
            endDate: '2022-12-26T13:30',
            title: 'Go to a gym',
          },
        ]}
        currentDate={new Date().getTime()}
      />
    </PageProvider>
  );
};
export default CalendarPage;
