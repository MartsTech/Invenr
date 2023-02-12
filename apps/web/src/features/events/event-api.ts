import {api} from 'lib/api';
import {reqStateFailure, reqStateSuccess} from 'lib/store/store-utils';
import {eventsListStateUpdated} from './events-state';
import type {CalendarEvent} from './events-types';

const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    events: builder.query<
      CalendarEvent[],
      {calendarIds?: string[]; currentDate?: string; view?: string}
    >({
      query: ({calendarIds, currentDate, view}) => ({
        url: '/events',
        method: 'GET',
        params: {
          calendarIds: calendarIds?.join(','),
          currentDate: currentDate || new Date().toISOString(),
          view: view || 'Day',
        },
      }),
      async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
        const result = await queryFulfilled;

        if (result.meta?.response?.status === 200) {
          dispatch(eventsListStateUpdated(reqStateSuccess(result.data)));
        } else {
          dispatch(
            eventsListStateUpdated(
              reqStateFailure(new Error('Error loading events')),
            ),
          );
        }
      },
      transformResponse: (response: {data: CalendarEvent[]}) => response.data,
      providesTags: ['CalendarEvents'],
    }),
  }),
});

export const {useEventsQuery, useLazyEventsQuery} = eventsApi;

export default eventsApi;
