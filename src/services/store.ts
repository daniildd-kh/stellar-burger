import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './reducers/ingredients-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import constructorSlice from './reducers/constructor-slice';
import feedsSlice from './reducers/feeds-slice';
import authSlice from './reducers/auth-slice';

const rootReducer = combineReducers({
  ingredientsSlice,
  constructorSlice,
  feedsSlice, 
  authSlice
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
