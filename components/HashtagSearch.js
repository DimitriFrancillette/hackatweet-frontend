import styles from '../styles/HashtagSearch.module.css';
import { Input } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

function HashtagSearch({ hashtagName, hashtagValue }) {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchText((prevSearchText) => {
      if (hashtagName !== '0') {
        return hashtagName;
      }
      return prevSearchText;
    });
  }, [hashtagName]);

  //l'url change seulement 0.5 sec après que le user est fini de taper
  useEffect(() => {
    const updateRouter = () => {
      if (searchText === '') {
        router.push(`/hashtag/0`);
      } else {
        router.push(`/hashtag/${searchText}`);
      }
    };

    const handler = setTimeout(updateRouter, 500);

    // clean up le timeout si searchText change ou le composant se démontes
    return () => {
      clearTimeout(handler);
    };
  }, [searchText, router]);

  const onChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    hashtagValue(text);
  };

  //quand l'url change, le focus se fait sur la bar de recherche
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [router]);

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <h3>Hashtag search</h3>
      </div>
      <div className={styles.input_div}>
        <Input
          ref={inputRef}
          className={styles.searchHashtag}
          rows={2}
          placeholder='Hashtag search'
          onChange={onChange}
          value={searchText}
        />
      </div>
    </div>
  );
}

export default HashtagSearch;
