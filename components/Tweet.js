import styles from '../styles/Tweet.module.css';
import { Input, Button } from 'antd';
import { useState } from "react";

function Tweet() {

  const [letterCount, setLetterCount] = useState(0);

  const { TextArea } = Input;
  const onChange = (e) => {
    setLetterCount(e.target.value.length)
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Home</h3>
      </div>
      <div className={styles.input_div}>
        <TextArea className={styles.textArea} rows={3} placeholder="What's up ?" maxLength={280} style={{ backgroundColor: "#2A3C50" }} onChange={onChange} />
      </div>
      <div className={styles.button_div}>
        <span className={styles.letterCount}>{letterCount}/280</span>
        <Button type="primary" onClick={() => showModal('up')} className={styles.signUpbutton}>
          Tweet
        </Button>
      </div>
    </div>
  );
}

export default Tweet;
