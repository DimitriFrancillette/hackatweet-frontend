import styles from '../styles/UserInformation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/reducers/user';
import { useRouter } from 'next/navigation';

export default function UserInformation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push(`/`);
  };

  return (
    <div className={styles.user_div}>
      <div className={styles.userInfos}>
        <div className={styles.userLogo}>
          <FontAwesomeIcon icon={faEgg} className={styles.egg} />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userFirstname}>{user.firstname}</div>
          <div className={styles.userUsername}>@{user.username}</div>
        </div>
      </div>
      <Button type='primary' ghost onClick={() => handleLogout()}>
        Logout
      </Button>
    </div>
  );
}
