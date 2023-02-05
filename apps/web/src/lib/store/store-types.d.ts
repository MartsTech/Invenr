import type {
  Action,
  AnyAction,
  Dispatch,
  Middleware,
  SerializedError,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {rootReducer} from '.';

export type RootState = ReturnType<typeof rootReducer>;

export type StoreDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, void, AnyAction>;

export type StoreThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type StoreMiddleware = Middleware<{}, RootState, StoreDispatch>;

export interface RequestState<T> {
  isDefault: boolean;
  isFailure: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  body?: T;
  error?: SerializedError;
}
