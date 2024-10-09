import styles from '../styles/OneTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
const moment = require('moment');

function OneTweet(props) {
  const [showTrash, setShowTrash] = useState(false);
  const user = useSelector((state) => state.user.value);

  let heartStyle = { color: '#ffffff', cursor: 'pointer' };
  if (props.likes.length > 0) {
    heartStyle = { color: 'red', cursor: 'pointer' };
  }

  const fromNow = moment(props.postedDate).fromNow(true);

  const likesArray = props.likes;
  const likesNumber = likesArray.length;

  const handleLikes = () => {
    const idsearch = likesArray.includes(user.userId);
    console.log(idsearch);

    if (!idsearch) {
      fetch(
        `https://hackhatweet-backend-ten.vercel.app/tweets/like/${props.tweetId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.userId }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          props.tweetListChange();
        });
      return;
    }

    fetch(
      `https://hackhatweet-backend-ten.vercel.app/tweets/unlike/${props.tweetId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        props.tweetListChange();
      });
  };

  useEffect(() => {
    if (props.userId === user.userId) {
      setShowTrash(true);
    }
  }, []);

  const deleteTweet = () => {
    const hashtagRegex = /#(\w+)/g;
    const words = props.description.split(' ');

    words.map((word) => {
      const isHashtag = word.match(hashtagRegex);

      if (isHashtag) {
        fetch('https://hackhatweet-backend-ten.vercel.app/hashtags/', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: word, tweetId: props.tweetId }),
        });
      }
    });

    fetch(
      `https://hackhatweet-backend-ten.vercel.app/tweets/${props.tweetId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then(() => {
        props.tweetListChange();
      });
  };

  //fonction qui récupère la phrase pour trouver les mots hashtag et les styliser avant de l'afficher
  function Sentence() {
    const hashtagRegex = /#(\w+)/g;
    //on sépare les mots dans un tableau
    const words = props.description.split(' ');

    return (
      <span>
        {words.map((word, index) => {
          //On passe dans le tableau et on vérifie si c'est un hashtag
          const isHashtag = word.match(hashtagRegex);

          if (isHashtag) {
            //Si c'est le cas on l'affiche avec un style
            return (
              <span
                key={index}
                style={{ color: '#4096FF', fontWeight: 'bold' }}
              >
                {' '}
                {word}{' '}
              </span>
            );
          } else {
            //Sinon on le renvoi normalement
            return `${word} `;
          }
        })}
      </span>
    );
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
          <div className={styles.userFirstname}>{props.firstname}</div>
          <div className={styles.userUsername}>@{props.username}</div>
          <div className={styles.tweetTime}>. {fromNow}</div>
        </div>
        <div className={styles.tweetText}>
          <Sentence />
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

export default OneTweet;
