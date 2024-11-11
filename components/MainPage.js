'use client';
import styles from '../styles/MainPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import LoginPage from './LoginPage';
import Trends from './Trends';
import TweetPosting from './TweetPosting';
import OneTweet from './OneTweet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/user';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

function MainPage() {
  const dispatch = useDispatch();
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://hackhatweet-backend-ten.vercel.app/tweets/')
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setTweetsData(data);
      });
  }, [tweetsReload]);

  const tweetListChange = () => {
    setTweetsReload(!tweetsReload);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const tweetList = tweetsData.map((data, i) => {
    return (
      <OneTweet
        key={i}
        description={data.description}
        likes={data.likes}
        postedDate={data.postedTime}
        userId={data.user._id}
        firstname={data.user.firstname}
        username={data.user.username}
        tweetId={data._id}
        tweetListChange={tweetListChange}
      />
    );
  });

  let firstPage = <LoginPage />;

  const homePage = (
    <div className={styles.mainHome}>
      <div className={styles.leftSide}>
        <div className={styles.bird_div}>
          <FontAwesomeIcon
            icon={faTwitter}
            className={styles.bird}
            style={{ color: '#ffffff' }}
          />
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
          <Button type='primary' ghost onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.tweet_div}>
          <TweetPosting tweetListChange={tweetListChange} />
        </div>
        <div className={styles.lastTweets_div}>
          {isLoading && <Spinner />}
          {tweetList}
        </div>
      </div>
      <div className={styles.rightSide}>
        <Trends reload={tweetsReload} />
      </div>
    </div>
  );

  if (user.token !== null) {
    firstPage = homePage;
  }

  return <>{firstPage}</>;
}

export default MainPage;
