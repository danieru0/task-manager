import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
