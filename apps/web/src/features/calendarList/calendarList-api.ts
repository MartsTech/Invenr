import {api} from 'lib/api';
import {reqStateFailure, reqStateSuccess} from 'lib/store/store-utils';
import {calendarListStateUpdated} from './calendarList-state';
import type {CalendarListEntry} from './calendarList-types';

const calendarListApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    calendarList: builder.query<CalendarListEntry[], void>({
      query: () => ({
        url: '/calendarList',
        method: 'GET',
      }),
      async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
        const result = await queryFulfilled;

        if (result.meta?.response?.status === 200) {
          dispatch(calendarListStateUpdated(reqStateSuccess(result.data)));
        } else {
          dispatch(
            calendarListStateUpdated(
              reqStateFailure(new Error('Error loading calendar list')),
            ),
          );
        }
      },
      transformResponse: (response: {data: CalendarListEntry[]}) =>
        response.data,
      providesTags: ['CalendarList'],
    }),
  }),
});

export const {useCalendarListQuery} = calendarListApi;

export default calendarListApi;
