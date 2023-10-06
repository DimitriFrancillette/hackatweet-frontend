import styles from '../../styles/Hashtag.module.css';
import { useRouter } from 'next/router';



function Hashtag(props) {

  const router = useRouter();
    const hashtagName = router.query.hashtagName;

    return (
        <p className={styles.pop}>HASHTAG PAGE {hashtagName}</p>
    );
}

export default Hashtag;
