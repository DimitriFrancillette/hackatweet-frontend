'use client';
import { useSelector } from 'react-redux';
import LoginPage from '@/components/LoginPage';
import HashtagPage from '@/components/hashtag/HashtagPage';

export default function Hashtag({ params }) {
  const user = useSelector((state) => state.user.value);
  const hashtagName = params.hashtag;

  return (
    <>
      {user.token !== null ? (
        <HashtagPage hashtagName={hashtagName} />
      ) : (
        <LoginPage />
      )}
    </>
  );
}
