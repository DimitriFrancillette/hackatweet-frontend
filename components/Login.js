import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Button, Modal, Input, Space } from 'antd';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

// TODO faire passer les modales dans  les composants signup et signIn et faire passer le state correspondant en props

function Login() {

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    const showModal = (e) => {
        e === 'up' ? setIsSignUpModalOpen(true) : setIsSignInModalOpen(true);
    };

    const handleOk = (e) => {
        e === 'up' ? setIsSignUpModalOpen(false) : setIsSignInModalOpen(false);
    };

    const handleCancel = (e) => {
        e === 'up' ? setIsSignUpModalOpen(false) : setIsSignInModalOpen(false);
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
                    <Button type="primary" onClick={() => showModal('up')} className={styles.signUpbutton}>
                        Sign up
                    </Button>
                    <span className={styles.signText}>Already have an account?</span>
                    <Button type="primary" onClick={() => showModal()} className={styles.signInbutton}>
                        Sign in
                    </Button>
                </div>
                    <Modal
                    className={styles.modale}
                    open={isSignUpModalOpen}
                    onCancel={() => handleCancel('up')}
                    centered
                    bodyStyle={{ height: 350 }}
                    width={600}
                    footer={[
                        <Button className={styles.modaleButton} key="submit" type="primary" onClick={() => handleOk('up')}>
                            Sign up
                        </Button>
                    ]}
                >
                    <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
                    <p className={styles.modaleUpText} >Create your Hackatweet account</p>
                    <Space direction="vertical" size={20}>
                        <Input className={styles.modaleInput} placeholder="Firstname" style={{backgroundColor: "#2A3C50"}}/>
                        <Input className={styles.modaleInput} placeholder="Username" style={{backgroundColor: "#2A3C50"}}/>
                        <Input className={styles.modaleInput} placeholder="Password" style={{backgroundColor: "#2A3C50"}}/>
                    </Space>

                </Modal>

                <Modal
                    open={isSignInModalOpen}
                    onCancel={() => handleCancel()}
                    centered
                    bodyStyle={{ height: 350 }}
                    width={600}
                    footer={[
                        <Button className={styles.modaleButton} key="submit" type="primary" onClick={() => handleOk()}>
                            Sign in
                        </Button>
                    ]}
                >
                    <FontAwesomeIcon icon={faTwitter} className={styles.modaleBird} />
                    <p className={styles.modaleInText} >Connect to Hackatweet</p>
                    <Space direction="vertical" size={20}>
                        <Input className={styles.modaleInput} placeholder="Username" style={{backgroundColor: "#2A3C50"}}/>
                        <Input className={styles.modaleInput} placeholder="Password" style={{backgroundColor: "#2A3C50"}}/>
                    </Space>
                </Modal>

            </div>
        </div>
    );
}

export default Login;
