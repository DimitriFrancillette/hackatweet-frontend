import styles from '../styles/OneTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';



function OneTweet(props) {

  const user = useSelector((state) => state.user.value);

  let heartStyle = { color: "#ffffff" };
  if (props.likes.length > 0) {
    heartStyle = { 'color': '#FF0000' };
  }


  const likesArray = props.likes;
  const likesNumber = likesArray.length;

  const handleLikes = () => {

    const idsearch = likesArray.includes(user.userId)
    console.log("ID SEARCH", idsearch)

    if (!idsearch) {
      fetch(`http://localhost:3000/tweets/like/${props.tweetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId }),
      }).then(response => response.json())
        .then(data => {
          props.tweetListChange();
        });
      return;
    }

    fetch(`http://localhost:3000/tweets/unlike/${props.tweetId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.userId }),
    }).then(response => response.json())
      .then(data => {
        props.tweetListChange();
      });


  };

  const deleteTweet = () => {

    fetch(`http://localhost:3000/tweets/${props.tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        props.tweetListChange();
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.tweetCard}>
        <div className={styles.userInfo}>
          <FontAwesomeIcon icon={faEgg} className={styles.egg} style={{ color: "#ffffff", }} />
          <div className={styles.userFirstname}>{props.firstname}</div>
          <div className={styles.userUsername}>@{props.username}</div>
          <div className={styles.tweetTime}>.  5 hours</div>
        </div>
        <div className={styles.tweetText}>{props.description}</div>
        <div className={styles.like_div}>
          <FontAwesomeIcon icon={faHeart} style={heartStyle} onClick={() => handleLikes()} />
          <span className={styles.likeCount}>{likesNumber}</span>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", }} onClick={() => deleteTweet()} />
        </div>

      </div>
    </div>
  );
}

export default OneTweet;
