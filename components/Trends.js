import styles from '../styles/Trends.module.css';

function Trends() {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h3>Trends</h3>
      </div>
      <div className={styles.trendsBox}>
        <div className={styles.hashCard}>
          <span className={styles.hashTag}>#hackatweet</span>
          <span className={styles.hashCount}>2 tweets</span>
        </div>
      </div>
    </div>
  );
}

export default Trends;
