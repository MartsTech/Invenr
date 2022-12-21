import type {
  Action,
  AnyAction,
  Dispatch,
  Middleware,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {rootReducer} from '.';

export type StoreDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, void, AnyAction>;

export type RootState = ReturnType<typeof rootReducer>;

export type StoreThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type StoreMiddleware = Middleware<{}, RootState, StoreDispatch>;
