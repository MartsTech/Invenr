import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RootState} from 'lib/store/store-types';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// =================== Types ======================
export interface CalendarState {
  currentDate: string;
  currentView: string;
}

// ============== Initial state ===================
const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  currentView: 'Day',
};

// =================== Actions ====================
export const calendarCurrentDateChanged = createAction<
  CalendarState['currentDate']
>('calendar/currentDateChanged');

export const calendarCurrentViewChanged = createAction<
  CalendarState['currentView']
>('calendar/currentViewChanged');

// ================= Reducers =====================
export const calendarReducer = createReducer(initialState, builder => {
  builder.addCase(calendarCurrentDateChanged, (state, action) => {
    state.currentDate = action.payload;
  });
  builder.addCase(calendarCurrentViewChanged, (state, action) => {
    state.currentView = action.payload;
  });
});

// ================= Persistors =====================
export const calendarPersistedReducer = persistReducer(
  {
    key: 'calendar',
    storage: storage,
    whitelist: [''],
  },
  calendarReducer,
);

// ================= Selectors ====================
export const calendarCurrentDateSelector = (
  state: RootState,
): CalendarState['currentDate'] => state.calendar.currentDate;

export const calendarCurrentViewSelector = (
  state: RootState,
): CalendarState['currentView'] => state.calendar.currentView;
