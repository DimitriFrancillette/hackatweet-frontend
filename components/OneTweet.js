import styles from '../styles/OneTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";



function OneTweet(props) {

  const deleteTweet = () => {

    fetch(`http://localhost:3000/tweets/${props.tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        props.tweetListChange();
      });
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.tweetCard}>
        <div className={styles.userInfo}>
          <FontAwesomeIcon icon={faEgg} className={styles.egg} style={{color: "#ffffff",}}/>
          <div className={styles.userFirstname}>{props.firstname}</div>
          <div className={styles.userUsername}>@{props.username}</div>
          <div className={styles.tweetTime}>.  5 hours</div>
        </div>
        <div className={styles.tweetText}>{props.description}</div>
        <div className={styles.like_div}>
        <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",}} />
        <span className={styles.likeCount}>0</span>
        <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} onClick={() => deleteTweet()} />
        </div>

      </div>
    </div>
  );
}

export default OneTweet;
