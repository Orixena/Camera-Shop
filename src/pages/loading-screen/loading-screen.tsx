import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <span className={styles.loader} data-testid="loading-element"></span>
  );
}

export default LoadingScreen;
