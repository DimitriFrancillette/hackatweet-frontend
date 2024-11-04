import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'antd';
import { useState } from 'react';
import AuthModal from './AuthModal';

function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState('signup');

  const showModal = (param) => {
    setAuthType(param);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <FontAwesomeIcon
          className={styles.bigBird}
          icon={faTwitter}
          style={{ color: '#ffffff' }}
        />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.bird_div}>
          <FontAwesomeIcon
            icon={faTwitter}
            className={styles.bird}
            style={{ color: '#ffffff' }}
          />
        </div>
        <div className={styles.text_div}>
          <h1 className={styles.bigTitle}>See what&apos;s happening</h1>
          <h2 className={styles.smallTitle}>Join Hackatweet today.</h2>
        </div>
        <div className={styles.buttons_div}>
          <Button
            type='primary'
            onClick={() => showModal('signup')}
            className={styles.signUpbutton}
          >
            Sign up
          </Button>
          <span className={styles.signText}>Already have an account ?</span>
          <Button
            type='primary'
            onClick={() => showModal('signin')}
            className={styles.signInbutton}
          >
            Sign in
          </Button>
        </div>
        <p>
          Sign up to be able to{' '}
          <span className={styles.emphasis}>see the latest tweets</span> and{' '}
          <span className={styles.emphasis}>add your own</span>.
        </p>
        <AuthModal
          modalState={isModalOpen}
          showModal={showModal}
          authType={authType}
        />
      </div>
    </div>
  );
}

export default LoginPage;
