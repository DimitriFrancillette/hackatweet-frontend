import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

export const makeStore = () => {
  return configureStore({
    reducer: { user },
  });
};
