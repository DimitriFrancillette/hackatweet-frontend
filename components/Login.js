import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

function Login() {
  return (
    <div className={styles.main}>
        <div className={styles.leftSide}>
        <FontAwesomeIcon className={styles.bigBird} icon={faTwitter} style={{color: "#ffffff",}} />
        </div>
        <div className={styles.rightSide}>
            <div className={styles.bird_div}>
            <FontAwesomeIcon icon={faTwitter} className={styles.bird} style={{color: "#ffffff",}} />
            </div>
            <div className={styles.text_div}>
                <h1 className={styles.bigTitle}>See what's happening</h1>
                <h2 className={styles.smallTitle}>Join Hackatweet today.</h2>
            </div>
            <div className={styles.buttons_div}>
                <button>Sign up</button>
                <span>Already have an account?</span>
                <button>Sign in</button>
            </div>
        </div>
    </div>
  );
}

export default Login;
