import styles from '../styles/AuthModal.module.css';
import { Modal, Button, Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/user';
import { BASE_API_URL } from '@/lib/constant';

function AuthModal({ authType, modalState, showModal }) {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const [isFirsnameFocused, setIsFirsnameFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  let objToPost = {
    username: username,
    password: password,
  };

  if (authType === 'signup') {
    objToPost.firstname = firstname;
  }

  const handleIdentification = () => {
    fetch(`${BASE_API_URL}/users/${authType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToPost),
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
          setFirstname('');
          setUsername('');
          setPassword('');
          showModal(authType);
        }

        setSignUpError(true);
        setFirstname('');
        setUsername('');
        setPassword('');
      });
  };

  const handleCancel = () => {
    showModal(authType);
    setSignUpError(false);
  };

  return (
    <div className={styles.main}>
      <Modal
        className={styles.modale}
        open={modalState}
        onCancel={() => handleCancel()}
        centered
        style={{ height: 400 }}
        width={600}
        footer={[
          <Button
            className={styles.modaleButton}
            key='submit'
            type='primary'
            onClick={() => handleIdentification()}
          >
            {authType === 'signup' ? 'Sign up' : 'Sign in'}
          </Button>,
        ]}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
        <p className={styles.modaleText}>
          {authType === 'signup'
            ? 'Create your Hackatweet account'
            : 'Connect to Hackatweet'}
        </p>
        <Space direction='vertical' size={20}>
          {authType === 'signup' && (
            <Input
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              className={styles.modaleInput}
              placeholder='Firstname'
              onFocus={() => setIsFirsnameFocused(true)}
              onBlur={() => setIsFirsnameFocused(false)}
              style={{
                backgroundColor: isFirsnameFocused ? '#595d63' : '#2A3C50',
              }}
            />
          )}
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
        {signUpError && (
          <p className={styles.modaleError}>
            {authType === 'signup'
              ? 'User already exists or a field is incorrect'
              : 'Wrong login or wrong password'}
          </p>
        )}
      </Modal>
    </div>
  );
}

export default AuthModal;
