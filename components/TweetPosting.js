import styles from '../styles/TweetPosting.module.css';
import { Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TweetPosting({ tweetListChange }) {
  const [letterCount, setLetterCount] = useState(0);
  const [tweetText, setTweetText] = useState('');
  const [newTweet, setNewTweet] = useState({});

  const { TextArea } = Input;
  const onChange = (e) => {
    setLetterCount(e.target.value.length);
    setTweetText(e.target.value);
  };

  const user = useSelector((state) => state.user.value);

  const handleTweet = () => {
    fetch('https://hackhatweet-backend-ten.vercel.app/tweets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: tweetText, user: user.userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTweet(data.newTweet);
        tweetListChange();
        setTweetText('');
      });
  };

  // si le tweet bien save en DB et s'il contient un # on le save dans la DB
  useEffect(() => {
    if (newTweet._id) {
      const hashtagRegex = /#(\w+)/g;
      const words = newTweet.description.split(' ');

      words.forEach((word) => {
        const isHashtag = word.match(hashtagRegex);

        if (isHashtag) {
          fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: word, tweetId: newTweet._id }),
          })
            .then((response) => response.json())
            .then((data) => {
              tweetListChange();
            });
        }
      });
    }
  }, [newTweet, tweetListChange]);

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Home</h3>
      </div>
      <div className={styles.input_div}>
        <TextArea
          className={styles.textArea}
          rows={4}
          placeholder="What's up ?"
          maxLength={280}
          onChange={onChange}
          value={tweetText}
        />
      </div>
      <div className={styles.button_div}>
        <span className={styles.letterCount}>{letterCount}/280</span>
        <Button
          className={styles.tweetButton}
          type='primary'
          onClick={() => handleTweet()}
        >
          Tweet
        </Button>
      </div>
    </div>
  );
}

export default TweetPosting;
