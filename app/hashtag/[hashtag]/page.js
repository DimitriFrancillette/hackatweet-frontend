'use client';
import styles from '../../../styles/Hashtag.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import LoginPage from '../../../components/LoginPage';
import Trends from '../../../components/Trends';
import HashtagSearch from '../../../components/HashtagSearch';
import OneTweet from '../../../components/OneTweet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/user';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

function Hashtag({ params }) {
  const dispatch = useDispatch();
  const [hashtagsData, setHashtagsData] = useState([]);
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const router = useRouter();
  const hashtagName = params.hashtag;
  const user = useSelector((state) => state.user.value);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setReload((prevReload) => !prevReload);
  }, [hashtagName]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/')
      .then((response) => response.json())
      .then((data) => {
        setHashtagsData(data);
        setTweetsReload((prevTweetsReload) => !prevTweetsReload);
        setIsLoading(false);
      });
  }, [reload]);

  useEffect(() => {
    hashtagValue(hashtagName);
  }, [tweetsReload]);

  const tweetListChange = () => {
    setTweetsReload(!tweetsReload);
    setReload(!reload);
  };

  let tweetList = tweetsData.map((data, i) => {
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

  const hashtagValue = (value) => {
    let filter = hashtagsData.filter((e) => {
      return e.name.includes(`#${value}`);
    });

    if (filter.length > 0) {
      tweetsSetUp(filter);
    } else {
      tweetsSetUp(hashtagsData);
    }
  };

  const tweetsSetUp = (data) => {
    const tweetsArray = [];
    data.forEach((tag) => {
      tag.tweet.forEach((element) => {
        tweetsArray.push(element);
      });
    });
    setTweetsData(tweetsArray);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(`/`);
  };

  let firstPage = <LoginPage />;

  const hashtagPage = (
    <div className={styles.mainHome}>
      <div className={styles.leftSide}>
        <Link href='/' className={styles.birdText}>
          <div className={styles.bird_div}>
            <FontAwesomeIcon
              icon={faTwitter}
              className={styles.bird}
              style={{ color: '#ffffff' }}
            />
          </div>
          <p className={styles.linkText}>fly back to Home</p>
        </Link>
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
          <HashtagSearch
            tweetListChange={tweetListChange}
            hashtagValue={hashtagValue}
            hashtagName={hashtagName}
          />
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
    firstPage = hashtagPage;
  }

  return <>{firstPage}</>;
}

export default Hashtag;
