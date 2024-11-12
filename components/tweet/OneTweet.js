import styles from '../../styles/OneTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
const moment = require('moment');

export default function OneTweet({
  firstname,
  username,
  likes,
  tweetId,
  postedDate,
  setTweetsReload,
  userId,
  description,
  setTweetsReloadForDelete,
}) {
  const [showTrash, setShowTrash] = useState(false);
  const user = useSelector((state) => state.user.value);

  const timeFromNow = moment(postedDate).fromNow(true);

  const likesArray = likes;
  const likesNumber = likesArray.length;

  useEffect(() => {
    if (userId === user.userId) {
      setShowTrash(true);
    }
  }, [user, userId]);

  const handleLikes = () => {
    const isIdInLikesArray = likesArray.includes(user.userId);

    if (!isIdInLikesArray) {
      fetch(
        `https://hackhatweet-backend-ten.vercel.app/tweets/like/${tweetId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.userId }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          setTweetsReload((prevState) => !prevState);
        });
      return;
    }

    fetch(
      `https://hackhatweet-backend-ten.vercel.app/tweets/unlike/${tweetId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setTweetsReload((prevState) => !prevState);
      });
  };

  const deleteTweet = () => {
    const hashtagRegex = /#(\w+)/g;
    const words = description.split(' ');

    words.map((word) => {
      const isHashtag = word.match(hashtagRegex);

      if (isHashtag) {
        fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: word, tweetId: tweetId }),
        });
      }
    });

    fetch(`https://hackhatweet-backend-ten.vercel.app/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => {
        setTweetsReload((prevState) => !prevState);

        if (setTweetsReloadForDelete) {
          setTweetsReloadForDelete((prevState) => !prevState);
        }
      });
  };

  let heartStyle = { color: '#ffffff', cursor: 'pointer' };
  if (likes.length > 0) {
    heartStyle = { color: 'red', cursor: 'pointer' };
  }

  return (
    <div className={styles.main}>
      <div className={styles.tweetCard}>
        <div className={styles.userInfo}>
          <FontAwesomeIcon
            icon={faEgg}
            className={styles.egg}
            style={{ color: '#ffffff' }}
          />
          <div className={styles.userFirstname}>{firstname}</div>
          <div className={styles.userUsername}>@{username}</div>
          <div className={styles.tweetTime}>. {timeFromNow} ago</div>
        </div>
        <div className={styles.tweetText}>
          <Sentence description={description} />
        </div>
        <div className={styles.like_div}>
          <FontAwesomeIcon
            icon={faHeart}
            style={heartStyle}
            onClick={() => handleLikes()}
          />
          <span className={styles.likeCount}>{likesNumber}</span>
          {showTrash && (
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ color: '#ffffff', cursor: 'pointer' }}
              onClick={() => deleteTweet()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

//fonction qui récupère la phrase pour trouver les mots hashtag et les styliser avant de l'afficher
function Sentence({ description }) {
  const hashtagRegex = /#(\w+)/g;

  const words = description.split(' ');
  const tweetText = words.map((word, index) => {
    const isWordWithHashtag = word.match(hashtagRegex);

    return isWordWithHashtag ? (
      <span key={index} style={{ color: '#4096FF', fontWeight: 'bold' }}>
        {`${word} `}
      </span>
    ) : (
      `${word} `
    );
  });

  return <span>{tweetText}</span>;
}
