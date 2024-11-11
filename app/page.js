'use client';
import { useSelector } from 'react-redux';
import MainPage from '../components/MainPage';
import LoginPage from '@/components/LoginPage';

export default function Home() {
  const user = useSelector((state) => state.user.value);

  return <>{user.token !== null ? <MainPage /> : <LoginPage />}</>;
}
