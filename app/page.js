'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import MainPage from '../components/MainPage';

const store = configureStore({
  reducer: { user },
});

export default function Home() {
  return (
    <Provider store={store}>
      {' '}
      <MainPage />
    </Provider>
  );
}
