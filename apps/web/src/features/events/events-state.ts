import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RequestState, RootState} from 'lib/store/store-types';
import {reqStateDefault} from 'lib/store/store-utils';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {CalendarEvent} from './events-types';

// =================== Types ======================
export interface EventsState {
  listState: RequestState<CalendarEvent[]>;
}

// ============== Initial state ===================
const initialState: EventsState = {
  listState: reqStateDefault(),
};

// =================== Actions ====================
export const eventsListStateUpdated = createAction<EventsState['listState']>(
  'events/listStateUpdated',
);

// ================= Reducers =====================
export const eventsReducer = createReducer(initialState, builder => {
  builder.addCase(eventsListStateUpdated, (state, action) => {
    state.listState = {
      ...state.listState,
      body: [
        // ...(state.listState.body || []).filter(
        //   x => !action.payload.body?.find(y => x.id === y.id),
        // ),
        ...(action.payload.body || []),
      ],
    };
  });
});

// ================= Persistors =====================
export const eventsPersistedReducer = persistReducer(
  {
    key: 'events',
    storage: storage,
    whitelist: [''],
  },
  eventsReducer,
);

// ================= Selectors ====================
export const eventsListStateSelector = (
  state: RootState,
): EventsState['listState'] => state.events.listState;
