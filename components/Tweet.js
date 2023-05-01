import styles from '../styles/Tweet.module.css';
import { Input } from 'antd';

function Tweet() {

  const { TextArea } = Input;

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Home</h3>
      </div>
      <div className={styles.input_div}>
      <TextArea rows={3} placeholder="maxLength is 6" showCount maxLength={280} onChange={onChange}/>
      </div>
      <div className={styles.button_div}></div>
    </div>
  );
}

export default Tweet;
