import styles from '../styles/LastTweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";



function LastTweets(props) {
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
        <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
        </div>

      </div>
    </div>
  );
}

export default LastTweets;
