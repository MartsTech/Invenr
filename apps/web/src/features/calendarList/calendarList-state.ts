import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RequestState, RootState} from 'lib/store/store-types';
import {reqStateDefault} from 'lib/store/store-utils';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {CalendarListEntry} from './calendarList-types';

// =================== Types ======================
export interface CalendarListState {
  listState: RequestState<CalendarListEntry[]>;
}

// ============== Initial state ===================
const initialState: CalendarListState = {
  listState: reqStateDefault(),
};

// =================== Actions ====================
export const calendarListStateUpdated = createAction<
  CalendarListState['listState']
>('calendarList/listStateUpdated');

// ================= Reducers =====================
export const calendarListReducer = createReducer(initialState, builder => {
  builder.addCase(calendarListStateUpdated, (state, action) => {
    state.listState = action.payload;
  });
});

// ================= Persistors =====================
export const calendarListPersistedReducer = persistReducer(
  {
    key: 'calendarList',
    storage: storage,
    whitelist: ['listState'],
  },
  calendarListReducer,
);

// ================= Selectors ====================
export const calendarListStateSelector = (
  state: RootState,
): CalendarListState['listState'] => state.calendarList.listState;
