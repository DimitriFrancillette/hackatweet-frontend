'use client';
import styles from '../../../styles/Hashtag.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoginPage from '../../../components/LoginPage';
import Trends from '../../../components/Trends';
import HashtagSearch from '../../../components/HashtagSearch';
import OneTweet from '../../../components/OneTweet';
import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import UserInformation from '@/components/UserInformation';
import Bird from '@/components/Bird';

function Hashtag({ params }) {
  const [hashtagsData, setHashtagsData] = useState([]);
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const hashtagName = params.hashtag;
  const user = useSelector((state) => state.user.value);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setReload((prevReload) => !prevReload);
  }, [hashtagName]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/')
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setHashtagsData(data);
        setTweetsReload((prevTweetsReload) => !prevTweetsReload);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('Something went wrong.');
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

  let firstPage = <LoginPage />;

  const hashtagPage = (
    <div className={styles.mainHome}>
      <div className={styles.leftSide}>
        <Link href='/' className={styles.birdText}>
          <Bird />
          <p className={styles.linkText}>fly back to Home</p>
        </Link>
        <UserInformation />
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
          {errorMessage && <ErrorMessage message={errorMessage} />}
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
