import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Button, Modal } from 'antd';
import { useState } from 'react';


function Login() {

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const showModal = () => {
        setIsSignUpModalOpen(true);
    };

    const handleOk = () => {
        setIsSignUpModalOpen(false);
    };

    const handleCancel = () => {
        setIsSignUpModalOpen(false);
    };
    return (
        <div className={styles.main}>
            <div className={styles.leftSide}>
                <FontAwesomeIcon className={styles.bigBird} icon={faTwitter} style={{ color: "#ffffff", }} />
            </div>
            <div className={styles.rightSide}>
                <div className={styles.bird_div}>
                    <FontAwesomeIcon icon={faTwitter} className={styles.bird} style={{ color: "#ffffff", }} />
                </div>
                <div className={styles.text_div}>
                    <h1 className={styles.bigTitle}>See what's happening</h1>
                    <h2 className={styles.smallTitle}>Join Hackatweet today.</h2>
                </div>
                <div className={styles.buttons_div}>
                    <Button type="primary" onClick={() => showModal()} className={styles.signUpbutton}>
                        Sign up
                    </Button>
                    <span className={styles.signText}>Already have an account?</span>
                    <Button type="primary" onClick={() => showModal()} className={styles.signInbutton}>
                        Sign in
                    </Button>
                </div>

                <Modal title="" open={isSignUpModalOpen} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </div>
    );
}

export default Login;
