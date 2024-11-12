import styles from '../../styles/TweetPage.module.css';
import { useEffect, useState } from 'react';
import OneTweet from './OneTweet';
import Bird from '../Bird';
import UserInformation from '../UserInformation';
import TweetPosting from './TweetPosting';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import Trends from '../Trends';

export default function TweetPage() {
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const tweetList = tweetsData
    .slice()
    .reverse()
    .map((data) => {
      return (
        <OneTweet
          key={data._id}
          description={data.description}
          likes={data.likes}
          postedDate={data.postedTime}
          userId={data.user._id}
          firstname={data.user.firstname}
          username={data.user.username}
          tweetId={data._id}
          setTweetsReload={setTweetsReload}
        />
      );
    });

  return (
    <div className={styles.mainHome}>
      <div className={styles.leftSide}>
        <Bird />
        <UserInformation />
      </div>
      <div className={styles.middle}>
        <div className={styles.tweet_div}>
          <TweetPosting setTweetsReload={setTweetsReload} />
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
