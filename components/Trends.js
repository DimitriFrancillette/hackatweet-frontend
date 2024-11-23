import styles from '../styles/Trends.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HashtagCard from './hashtag/HashtagCard';
import { BASE_API_URL } from '@/lib/constant';

function Trends({ reload }) {
  const [hashData, setHashData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${BASE_API_URL}/hashtags/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setHashData(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong.');
      });
  }, [reload]);

  const hashList = hashData.map((data) => {
    const linkParam = data.name.split('#')[1];

    const hashtagLink = `/hashtag/${linkParam}`;

    return (
      <HashtagCard
        key={data._id}
        hashtagLink={hashtagLink}
        hashtagName={data.name}
        tweetCount={data.tweet.length}
      />
    );
  });

  return (
    <div className={styles.main}>
      <Link className={styles.title} href='/hashtag/0'>
        <h3>Trends</h3>
      </Link>
      <p className={styles.error}>{errorMessage}</p>
      <div className={styles.trendsBox}>{hashList}</div>
    </div>
  );
}

export default Trends;
