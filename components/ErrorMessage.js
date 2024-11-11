import styles from '../styles/ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return <p className={styles.errorMessage}>{message}</p>;
}
