'use client';
import { useSelector } from 'react-redux';
import TweetPage from '@/components/tweet/TweetPage';
import LoginPage from '@/components/LoginPage';

export default function Home() {
  const user = useSelector((state) => state.user.value);

  return <>{user.token !== null ? <TweetPage /> : <LoginPage />}</>;
}
