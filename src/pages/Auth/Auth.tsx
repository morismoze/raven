import { AuthCard } from '@/components';
import Logo from '@/assets/images/logo.svg';
import styles from './Auth.module.scss';

export const Auth = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <AuthCard />
    </div>
  );
};
