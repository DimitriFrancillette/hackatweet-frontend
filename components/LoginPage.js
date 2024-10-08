import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'antd';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

function LoginPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const showModal = (param) => {
    param === 'up' ? setIsSignUpModalOpen(true) : setIsSignInModalOpen(true);
  };

  const modalOk = (param) => {
    param === 'up' ? setIsSignUpModalOpen(false) : setIsSignInModalOpen(false);
  };

  const modalCancel = (param) => {
    param === 'up' ? setIsSignUpModalOpen(false) : setIsSignInModalOpen(false);
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
            onClick={() => showModal('up')}
            className={styles.signUpbutton}
          >
            Sign up
          </Button>
          <span className={styles.signText}>Already have an account?</span>
          <Button
            type='primary'
            onClick={() => showModal()}
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

        {/* utilisation des props et du inverse data flow pour faire transiter les informations necessaires à l'ouverture et fermeture des modals */}
        <SignUp
          modalState={isSignUpModalOpen}
          modalCancel={modalCancel}
          modalOk={modalOk}
        />
        <SignIn
          modalState={isSignInModalOpen}
          modalCancel={modalCancel}
          modalOk={modalOk}
        />
      </div>
    </div>
  );
}

export default LoginPage;
