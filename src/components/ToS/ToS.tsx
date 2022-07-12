import { Link } from 'wouter';
import styles from './ToS.module.scss';

export const ToS = (): JSX.Element => {
  return (
    <span className={styles.root}>
      By continuing, You agree to our{' '}
      <Link to="#" className={styles.root__tos}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link to="#" className={styles.root__pp}>
        Privacy policy
      </Link>
      .
    </span>
  );
};
