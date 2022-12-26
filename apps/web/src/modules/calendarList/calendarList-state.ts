import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RootState} from 'lib/store/store-types';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {CalendarListEntry} from './calendarList-types';

// =================== Types ======================
export interface CalendarListState {
  list: CalendarListEntry[];
}

// ============== Initial state ===================
const initialState: CalendarListState = {
  list: [],
};

// =================== Actions ====================
export const calendarListLoaded = createAction<CalendarListState['list']>(
  'calendarList/loaded',
);

// ================= Reducers =====================
export const calendarListReducer = createReducer(initialState, builder => {
  builder.addCase(calendarListLoaded, (state, action) => {
    state.list = action.payload;
  });
});

// ================= Persistors =====================
export const calendarListPersistedReducer = persistReducer(
  {
    key: 'calendarList',
    storage: storage,
    whitelist: ['list'],
  },
  calendarListReducer,
);

// ================= Selectors ====================
export const calendarListSelector = (state: RootState) =>
  state.calendarList.list;
