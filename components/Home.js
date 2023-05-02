import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'antd';
import Login from './Login'
import Trends from './Trends';
import Tweet from './Tweet'
import LastTweets from './LastTweets'

function Home() {

  return (
    <div className={styles.mainHome}>
      <div className={styles.leftSide}>
        <div className={styles.bird_div}>
          <FontAwesomeIcon icon={faTwitter} className={styles.bird} style={{ color: "#ffffff", }} />
        </div>
        <div className={styles.user_div}>
          <div className={styles.userInfos}>
            <div className={styles.userLogo}>
              <FontAwesomeIcon icon={faEgg} className={styles.egg} />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userFirstname}>John</div>
              <div className={styles.userUsername}>@JohnCena</div>
            </div>
          </div>
          <Button type="primary" ghost>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.tweet_div}>
          <Tweet/>
        </div>
        <div className={styles.lastTweets_div}>
          <LastTweets/>
        </div>
      </div>
      <div className={styles.rightSide}>
        <Trends/>
      </div>
      {/* <Login /> */}
    </div>
  );
}

export default Home;
