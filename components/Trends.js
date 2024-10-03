import styles from '../styles/Trends.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Trends(props) {
  const [hashData, setHashData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3008/hashtags/')
      .then((response) => response.json())
      .then((data) => {
        setHashData(data);
      });
  }, [props.reload]);

  const hashList = hashData.map((data, i) => {
    const linkParam = data.name.split('#')[1];

    const hashLink = `/hashtag/${linkParam}`;

    return (
      <div key={i} className={styles.hashCard}>
        <Link href={hashLink}>
          <span className={styles.hashTag}>{data.name}</span>
        </Link>
        <span className={styles.hashCount}>{data.tweet.length} tweets</span>
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Link href='/hashtag/0'>
          <h3 className={styles.titleText}>Trends</h3>
        </Link>
      </div>
      <div className={styles.trendsBox}>{hashList}</div>
    </div>
  );
}

export default Trends;
