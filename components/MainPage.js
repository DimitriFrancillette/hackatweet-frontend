import styles from '../styles/MainPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import Trends from './Trends';
import TweetPosting from './TweetPosting';
import OneTweet from './OneTweet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/user';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

export default function MainPage() {
  const dispatch = useDispatch();
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://hackhatweet-backend-ten.vercel.app/tweets/')
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setTweetsData(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong.');
        setIsLoading(false);
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

  return (
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
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {tweetList}
        </div>
      </div>
      <div className={styles.rightSide}>
        <Trends reload={tweetsReload} />
      </div>
    </div>
  );
}
