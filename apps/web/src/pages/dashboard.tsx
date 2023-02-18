import {useCalendarListQuery} from 'features/calendarList/calendarList-api';
import DashboardModule from 'features/dashboard/DashboardModule';
import type {GetStaticProps, NextPage} from 'next';

const Dashboard: NextPage = () => {
  useCalendarListQuery();

  return <DashboardModule />;
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Dashboard',
    },
  };
};
