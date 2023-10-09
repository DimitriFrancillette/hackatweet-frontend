import styles from '../styles/HashtagSearch.module.css';
import { Input, Button } from 'antd';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


function HashtagSearch(props) {
  const [searchText, setSearchText] = useState('');


  const onChange = (e) => {
    setSearchText(e.target.value);
    props.hashtagValue(e.target.value);
  };


  // const handleTweet = () => {

  //   fetch('http://localhost:3000/tweets/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ description: tweetText, user: user.userId }),
  //   }).then(response => response.json())
  //     .then(data => {
  //       setNewTweet(data.newTweet);
  //       props.tweetListChange();

  //     });
  // };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Hashtag</h3>
      </div>
      <div className={styles.input_div}>
       <Input className={styles.searchHashtag} rows={2} placeholder="Hashtag search" onChange={onChange} value={searchText} />
      </div>
    </div>
  );
}

export default HashtagSearch;
