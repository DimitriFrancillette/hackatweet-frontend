import styles from '../../styles/Hashtag.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'antd';
import LoginPage from '../../components/LoginPage';
import Trends from '../../components/Trends';
import HashtagSearch from '../../components/HashtagSearch';
import OneTweet from '../../components/OneTweet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/user';
import { useEffect, useState } from 'react';





function Hashtag() {
  const dispatch = useDispatch();
  const [hashtagsData, setHashtagsData] = useState([]);
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsReload, setTweetsReload] = useState(false);
  const [search, setSearch] = useState("");
  const [tweetFiltered, setTweetsFiltered] = useState(tweetsData);




  useEffect(() => {
    fetch('http://localhost:3000/hashtags/')
      .then(response => response.json())
      .then(data => {
        console.log("RETURN DATA", data);

        setHashtagsData(data);





      });
  }, [tweetsReload]);

  const tweetsSetUp = (data) => {
    const tweetsArray = [];
    data.forEach(tag => {
      tag.tweet.forEach(element => {
        tweetsArray.push(element);
      });
    });

    console.log("tweetsArray", tweetsArray)
    setTweetsData(tweetsArray)
  }


  const hashtagValue = (value) => {
    let filter = hashtagsData.filter((e) => {
      return e.name.includes(`#${value}`);
    });

    if (filter.length > 0) {
      tweetsSetUp(filter);
    } else {
      tweetsSetUp(hashtagsData)
    }

  };

  const tweetListChange = () => {
    setTweetsReload(!tweetsReload);
  };


  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout())
  }

  const tweetList = tweetsData.map((data, i) => {
    return <OneTweet key={i}
      description={data.description}
      likes={data.likes}
      postedDate={data.postedTime}
      userId={data.user._id}
      firstname={data.user.firstname}
      username={data.user.username}
      tweetId={data._id}
      tweetListChange={tweetListChange} />
  });






  let firstPage = <LoginPage />;

  const homePage = <div className={styles.mainHome}>
    <div className={styles.leftSide}>
      <div className={styles.bird_div}>
        <FontAwesomeIcon icon={faTwitter} className={styles.bird} style={{ color: "#ffffff", }} />
      </div>
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
        <Button type="primary" ghost onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
    <div className={styles.middle}>
      <div className={styles.tweet_div}>
        <HashtagSearch tweetListChange={tweetListChange} hashtagValue={hashtagValue} />
      </div>
      <div className={styles.lastTweets_div}>
        {tweetList}
      </div>
    </div>
    <div className={styles.rightSide}>
      <Trends reload={tweetsReload} />
    </div>
  </div>

  if (user.token !== null) {
    firstPage = homePage;
  }

  return (
    <>
      {firstPage};
    </>
  );
}

export default Hashtag;
