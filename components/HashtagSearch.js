import styles from '../styles/HashtagSearch.module.css';
import { Input } from 'antd';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

function HashtagSearch(props) {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const hashtagName = router.query.hashtagName;


  useEffect (() => {
    if (props.hashtagName !== '0') {
      setSearchText(hashtagName);
    }
  }, [])

  const onChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    props.hashtagValue(text);

    if (text === "") {
    router.push(`/hashtag/0`);
    } else {
      router.push(`/hashtag/${e.target.value}`);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Hashtag</h3>
      </div>
      <div className={styles.input_div}>
       <Input className={styles.searchHashtag} rows={2} placeholder="Hashtag search" onChange={onChange} value={searchText} />
      </div>
    </div>
  );
}

export default HashtagSearch;