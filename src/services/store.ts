import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsReduce } from './slices/ingredientsSlice';
import { burgerReduce } from './slices/constructorBurgerSlice';
import { userReduce } from './slices/userSlice';
import { orderReduce } from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReduce,
  burger: burgerReduce,
  user: userReduce,
  orders: orderReduce
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
