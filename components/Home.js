import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'antd';
import LoginPage from './LoginPage';
import Trends from './Trends';
import TweetPosting from './TweetPosting';
import OneTweet from './OneTweet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { useEffect, useState } from 'react';




function Home() {
  const dispatch = useDispatch();
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/tweets/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // console.log(data[0]._id);
        setTweetsData(data)
      });
  }, [tweetsReload]);

  const newTweetAdded = () => {
    setTweetsReload(!tweetsReload);
  };

  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout())
  }

  const tweetList = tweetsData.map((data, i) => {
    return <OneTweet key={data._id}
      description={data.description} 
      firstname={data.user.firstname} 
      username={data.user.username} />
  });

  let firstPage = <LoginPage />;

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
        <TweetPosting newTweetAdded={newTweetAdded}/>
      </div>
      <div className={styles.lastTweets_div}>
        {tweetList}
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
