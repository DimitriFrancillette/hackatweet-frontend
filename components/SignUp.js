import styles from '../styles/SignUp.module.css';
import { Modal, Button, Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/user';

function SignUp(props) {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);

  const handleSignUp = () => {
    fetch('https://hackhatweet-backend-ten.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname,
        username: username,
        password: password,
      }),
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
          props.modalOk('up');
        }

        setSignUpError(true);
        setFirstname('');
        setUsername('');
        setPassword('');
      });
  };

  const handleCancel = () => {
    const closeModal = () => props.modalCancel('up');
    closeModal();
    setSignUpError(false);
  };

  return (
    <div className={styles.main}>
      <Modal
        className={styles.modale}
        open={props.modalState}
        onCancel={() => handleCancel()}
        centered
        style={{ height: 400 }}
        width={600}
        footer={[
          <Button
            className={styles.modaleButton}
            key='submit'
            type='primary'
            onClick={() => handleSignUp()}
          >
            Sign up
          </Button>,
        ]}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
        <p className={styles.modaleUpText}>Create your Hackatweet account</p>
        <Space direction='vertical' size={20}>
          <Input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            className={styles.modaleInput}
            placeholder='Firstname'
            style={{ backgroundColor: '#2A3C50' }}
          />
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={styles.modaleInput}
            placeholder='Username'
            style={{ backgroundColor: '#2A3C50' }}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.modaleInput}
            placeholder='Password'
            style={{ backgroundColor: '#2A3C50' }}
          />
        </Space>
        {signUpError && (
          <p className={styles.modaleError}>
            User already exists or a field is incorrect
          </p>
        )}
      </Modal>
    </div>
  );
}

export default SignUp;
