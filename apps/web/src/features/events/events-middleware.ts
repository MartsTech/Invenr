import type {AnyAction} from '@reduxjs/toolkit';
import {
  calendarCurrentDateChanged,
  calendarCurrentViewChanged,
} from 'features/calendar/calendar-state';
import {calendarListStateUpdated} from 'features/calendarList/calendarList-state';
import type {StoreMiddleware} from 'lib/store/store-types';
import eventApi from './event-api';

export const eventsMiddleware: StoreMiddleware = store => {
  return next => {
    return (action: AnyAction) => {
      // ...Code before reducers and other middleware

      const result = next(action);

      // ...Code after reducers and other middleware

      if (
        (calendarListStateUpdated.match(action) && action.payload.isSuccess) ||
        calendarCurrentDateChanged.match(action) ||
        calendarCurrentViewChanged.match(action)
      ) {
        const state = store.getState();

        store.dispatch(
          eventApi.endpoints.events.initiate({
            calendarIds: state.calendarList.listState.body?.map(
              (calendar: {id: string}) => calendar.id,
            ),
            currentDate: state.calendar.currentDate,
            view: state.calendar.currentView,
          }),
        );
      }

      return result;
    };
  };
};
