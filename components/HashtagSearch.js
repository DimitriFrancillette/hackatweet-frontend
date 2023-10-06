import styles from '../styles/HashtagSearch.module.css';
import { Input, Button } from 'antd';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


function HashtagSearch(props) {

  const [letterCount, setLetterCount] = useState(0);
  const [tweetText, setTweetText] = useState('');
  const [newTweet, setNewTweet] = useState({});


  const { TextArea } = Input;
  const onChange = (e) => {
    setLetterCount(e.target.value.length);
    setTweetText(e.target.value)
  };

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const hashtagRegex = /#(\w+)/g;
    const words = tweetText.split(' ');

    words.map((word) => {
      const isHashtag = word.match(hashtagRegex);

      if (isHashtag) {
        fetch('http://localhost:3000/hashtags/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: word, tweetId: newTweet._id }),
        }).then(response => response.json())
          .then(data => {
            props.tweetListChange();
          });
      }
    });
  }, [newTweet]);

  const handleTweet = () => {

    fetch('http://localhost:3000/tweets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: tweetText, user: user.userId }),
    }).then(response => response.json())
      .then(data => {
        setNewTweet(data.newTweet);
        props.tweetListChange();

      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Hashtag</h3>
      </div>
      <div className={styles.input_div}>
       <Input className={styles.searchHashtag} rows={2} placeholder="Hashtag search" onChange={onChange} value={tweetText} />
      </div>
    </div>
  );
}

export default HashtagSearch;
