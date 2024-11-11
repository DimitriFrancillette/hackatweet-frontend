import styles from '../styles/HashtagCard.module.css';
import Link from 'next/link';

export default function HashtagCard({
  hashCardkey,
  hashtagLink,
  hashtagName,
  tweetCount,
}) {
  return (
    <div className={styles.hashCard}>
      <Link href={hashtagLink}>
        <span className={styles.hashTag}>{hashtagName}</span>
      </Link>
      <span className={styles.hashCount}>{tweetCount} tweets</span>
    </div>
  );
}
