import styles from '../styles/Trends.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/Link';


function Trends(props) {
  const [hashReload, setHashReload] = useState(false);
  const [hashData, setHashData] = useState([]);

  const tweetListChange = () => {
    setHashReload(!hashReload);
  };

  useEffect(() => {
    fetch('http://localhost:3000/hashtags/')
      .then(response => response.json())
      .then(data => {
        setHashData(data)
      });
  }, [props.reload]);

  const hashList = hashData.map((data, i) => {
    return <div key={i} className={styles.hashCard}>
      <span className={styles.hashTag}>{data.name}</span>
      <span className={styles.hashCount}>{data.tweet.length} tweets</span>
    </div>
  });

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Link href='/hashtag'>
        <h3>Trends</h3>
        </Link>
      </div>
      <div className={styles.trendsBox}>
        {hashList}
      </div>
    </div>
  );
}

export default Trends;
