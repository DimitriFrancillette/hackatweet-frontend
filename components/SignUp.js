import styles from '../styles/SignUp.module.css';
import { Modal, Button, Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function SignUp(props) {
  return (
    <div className={styles.main}>
      <Modal
        className={styles.modale}
        open={props.modalState}
        onCancel={() => props.modalCancel('up')}
        centered
        bodyStyle={{ height: 350 }}
        width={600}
        footer={[
          <Button className={styles.modaleButton} key="submit" type="primary" onClick={() => props.modalOk('up')}>
            Sign up
          </Button>
        ]}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
        <p className={styles.modaleUpText} >Create your Hackatweet account</p>
        <Space direction="vertical" size={20}>
          <Input className={styles.modaleInput} placeholder="Firstname" style={{ backgroundColor: "#2A3C50" }} />
          <Input className={styles.modaleInput} placeholder="Username" style={{ backgroundColor: "#2A3C50" }} />
          <Input className={styles.modaleInput} placeholder="Password" style={{ backgroundColor: "#2A3C50" }} />
        </Space>

      </Modal>
    </div>
  );
}

export default SignUp;
