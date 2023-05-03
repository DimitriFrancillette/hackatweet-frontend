import styles from '../styles/SignIn.module.css';
import { Modal, Button, Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function SignIn(props) {
  return (
    <div className={styles.main}>

      <Modal
        open={props.modalState}
        onCancel={() =>props.modalCancel()}
        centered
        bodyStyle={{ height: 350 }}
        width={600}
        footer={[
          <Button className={styles.modaleButton} key="submit" type="primary" onClick={() => props.modalOk()}>
            Sign in
          </Button>
        ]}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
        <p className={styles.modaleInText} >Connect to Hackatweet</p>
        <Space direction="vertical" size={20}>
          <Input className={styles.modaleInput} placeholder="Username" style={{ backgroundColor: "#2A3C50" }} />
          <Input className={styles.modaleInput} placeholder="Password" style={{ backgroundColor: "#2A3C50" }} />
        </Space>
      </Modal>
    </div>
  );
}

export default SignIn;
