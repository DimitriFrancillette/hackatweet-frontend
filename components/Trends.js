import styles from '../styles/Trends.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HashtagCard from './HashtagCard';

function Trends({ reload }) {
  const [hashData, setHashData] = useState([]);

  useEffect(() => {
    fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/')
      .then((response) => response.json())
      .then((data) => {
        setHashData(data);
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
      <div className={styles.trendsBox}>{hashList}</div>
    </div>
  );
}

export default Trends;
