import styles from '../styles/TweetPosting.module.css';
import { Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TweetPosting(props) {
  const [letterCount, setLetterCount] = useState(0);
  const [tweetText, setTweetText] = useState('');
  const [newTweet, setNewTweet] = useState({});

  const { TextArea } = Input;
  const onChange = (e) => {
    setLetterCount(e.target.value.length);
    setTweetText(e.target.value);
  };

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const hashtagRegex = /#(\w+)/g;
    const words = tweetText.split(' ');

    words.map((word) => {
      const isHashtag = word.match(hashtagRegex);

      if (isHashtag) {
        fetch('http://localhost:3008/hashtags/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: word, tweetId: newTweet._id }),
        })
          .then((response) => response.json())
          .then((data) => {
            props.tweetListChange();
          });
      }
    });
  }, [newTweet]);

  const handleTweet = () => {
    fetch('http://localhost:3008/tweets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: tweetText, user: user.userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTweet(data.newTweet);
        props.tweetListChange();
        setTweetText('');
      });
  };

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
