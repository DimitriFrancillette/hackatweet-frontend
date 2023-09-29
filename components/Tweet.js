import styles from '../styles/Tweet.module.css';
import { Input, Button } from 'antd';
import { useState } from "react";

function Tweet() {

  const [letterCount, setLetterCount] = useState(0);
  const [tweetText, setTweetText] = useState('');


  const { TextArea } = Input;
  const onChange = (e) => {
    setLetterCount(e.target.value.length);
    setTweetText(e.target.value)
  };

  const handleTweet = () => {

    console.log(tweetText);
    fetch('http://localhost:3000/tweets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: tweetText, user: '6516e2e6e7ed55e42429b4bb'}),
    }).then(response => response.json())
      .then(data => {
        console.log(data);

      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Home</h3>
      </div>
      <div className={styles.input_div}>
        <TextArea className={styles.textArea} rows={4} placeholder="What's up ?" maxLength={280} onChange={onChange} value={tweetText} />
      </div>
      <div className={styles.button_div}>
        <span className={styles.letterCount}>{letterCount}/280</span>
        <Button className={styles.tweetButton} type="primary" onClick={() => handleTweet()} >
          Tweet
        </Button>
      </div>
    </div>
  );
}

export default Tweet;
