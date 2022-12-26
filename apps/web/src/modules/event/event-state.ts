import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RootState} from 'lib/store/store-types';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {CalendarEvent} from './event-types';

// =================== Types ======================
export interface EventState {
  list: CalendarEvent[];
}

// ============== Initial state ===================
const initialState: EventState = {
  list: [],
};

// =================== Actions ====================
export const eventListLoaded =
  createAction<EventState['list']>('events/listLoaded');

// ================= Reducers =====================
export const eventReducer = createReducer(initialState, builder => {
  builder.addCase(eventListLoaded, (state, action) => {
    state.list = action.payload;
  });
});

// ================= Persistors =====================
export const eventPersistedReducer = persistReducer(
  {
    key: 'event',
    storage: storage,
    whitelist: ['list'],
  },
  eventReducer,
);

// ================= Selectors ====================
export const eventListSelector = (state: RootState) => state.event.list;
