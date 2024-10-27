import styles from '../styles/SignIn.module.css';
import { Modal, Button, Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/user';

function SignIn({ modalOk, modalCancel, modalState }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const handleSignIn = () => {
    fetch('https://hackhatweet-backend-ten.vercel.app/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(
            login({
              firstname: data.firstname,
              username: data.username,
              token: data.token,
              userId: data.userId,
            })
          );
          setUsername('');
          setPassword('');
          modalOk();
        }
        setUsername('');
        setPassword('');
        setSignInError(true);
      });
  };

  const handleCancel = () => {
    const closeModal = () => modalCancel();
    closeModal();
    setSignInError(false);
  };

  return (
    <div className={styles.main}>
      <Modal
        open={modalState}
        onCancel={() => handleCancel()}
        centered
        style={{ height: 350 }}
        width={600}
        footer={[
          <Button
            className={styles.modaleButton}
            key='submit'
            type='primary'
            onClick={() => handleSignIn()}
          >
            Sign in
          </Button>,
        ]}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
        <p className={styles.modaleInText}>Connect to Hackatweet</p>
        <Space direction='vertical' size={20}>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={styles.modaleInput}
            placeholder='Username'
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
            style={{
              backgroundColor: isUsernameFocused ? '#595d63' : '#2A3C50',
            }}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.modaleInput}
            placeholder='Password'
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            style={{
              backgroundColor: isPasswordFocused ? '#595d63' : '#2A3C50',
            }}
          />
        </Space>
        {signInError && (
          <p className={styles.modaleError}>Wrong login or wrong password</p>
        )}
      </Modal>
    </div>
  );
}

export default SignIn;
