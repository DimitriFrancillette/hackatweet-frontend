import styles from '../../styles/HashtagPage.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Trends from '@/components/Trends';
import HashtagSearch from '@/components/hashtag/HashtagSearch';
import OneTweet from '@/components/tweet/OneTweet';
import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import UserInformation from '@/components/UserInformation';
import Bird from '@/components/Bird';
import { BASE_API_URL } from '@/lib/constant';

export default function HashtagPage({ hashtagName }) {
  const [hashtagsData, setHashtagsData] = useState([]);
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const [tweetsReloadForDelete, setTweetsReloadForDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/hashtags/`)
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
  }, [hashtagName, tweetsReloadForDelete]);

  useEffect(() => {
    hashtagValue(hashtagName);
  }, [tweetsReload, hashtagName]);

  const hashtagValue = (value) => {
    let filter = hashtagsData.filter((e) => e.name.includes(`#${value}`));
    filter.length > 0 ? tweetsSetUp(filter) : tweetsSetUp(hashtagsData);
  };

  //on this page tweets display is done based on hastags data
  const tweetsSetUp = (selectedHashtagData) => {
    const tweetsArray = [];

    selectedHashtagData.forEach((hashtag) => {
      hashtag.tweet.forEach((element) => {
        tweetsArray.push(element);
      });
    });
    setTweetsData(tweetsArray);
  };

  let tweetList = tweetsData
    .slice()
    .reverse()
    .map((data, i) => {
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
          setTweetsReload={setTweetsReload}
          setTweetsReloadForDelete={setTweetsReloadForDelete}
        />
      );
    });

  return (
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
}
