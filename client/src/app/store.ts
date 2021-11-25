import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import teamReducer from '../features/team/teamSlice';
import modalReducer from '../features/modal/modalSlice';
import contextReducer from '../features/context/contextSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  	reducer: {
    	team: teamReducer,
		modal: modalReducer,
		context: contextReducer,
		user: userReducer
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
