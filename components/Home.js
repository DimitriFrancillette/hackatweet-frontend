import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'antd';
import Login from './Login'
import Trends from './Trends';
import Tweet from './Tweet'
import LastTweets from './LastTweets'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';



function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout())
  }
      
      let firstPage = <Login />;

  const homePage = <div className={styles.mainHome}>
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
            <div className={styles.userFirstname}>{user.firstname}</div>
            <div className={styles.userUsername}>@{user.username}</div>
          </div>
        </div>
        <Button type="primary" ghost onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
    <div className={styles.middle}>
      <div className={styles.tweet_div}>
        <Tweet />
      </div>
      <div className={styles.lastTweets_div}>
        <LastTweets />
      </div>
    </div>
    <div className={styles.rightSide}>
      <Trends />
    </div>
  </div>

  if (user.token !== null) {
    firstPage = homePage;
  }

  return (
    <>
      {firstPage};
    </>
  );
}

export default Home;
