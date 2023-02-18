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
      queryFn: async (arg, queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/events',
          method: 'GET',
          params: {
            calendarIds: arg.calendarIds?.join(','),
            currentDate: arg.currentDate || new Date().toISOString(),
            view: arg.view || 'Day',
          },
        });

        if (result.meta?.response?.status === 200) {
          queryApi.dispatch(
            eventsListStateUpdated(
              reqStateSuccess(result.data as CalendarEvent[]),
            ),
          );
        } else {
          queryApi.dispatch(
            eventsListStateUpdated(
              reqStateFailure(new Error('Error loading events')),
            ),
          );
        }

        return {
          data: result.data as CalendarEvent[],
        };
      },
      providesTags: ['CalendarEvents'],
    }),
    eventsReschedule: builder.mutation<CalendarEvent[], CalendarEvent[]>({
      queryFn: async (arg, queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/events/reschedule',
          method: 'POST',
          body: {
            events: arg,
          },
        });

        if (result.meta?.response?.status === 200) {
          queryApi.dispatch(
            eventsListStateUpdated(
              reqStateSuccess(result.data as CalendarEvent[]),
            ),
          );
        } else {
          queryApi.dispatch(
            eventsListStateUpdated(
              reqStateFailure(new Error('Error loading events')),
            ),
          );
        }

        return {
          data: result.data as CalendarEvent[],
        };
      },
    }),
  }),
});

export const {useEventsQuery, useLazyEventsQuery, useEventsRescheduleMutation} =
  eventsApi;

export default eventsApi;
