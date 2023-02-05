import CalendarModule from 'features/calendar/CalendarModule';
import {useCalendarListQuery} from 'features/calendarList/calendarList-api';
import type {GetStaticProps, NextPage} from 'next';

const CalendarPage: NextPage = () => {
  useCalendarListQuery();

  return <CalendarModule />;
};
export default CalendarPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Calendar',
    },
  };
};
