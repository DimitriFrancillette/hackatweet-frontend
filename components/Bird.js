import styles from '../styles/Bird.module.css';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Bird() {
  return (
    <div className={styles.bird_div}>
      <FontAwesomeIcon
        icon={faTwitter}
        className={styles.bird}
        style={{ color: '#ffffff' }}
      />
    </div>
  );
}
