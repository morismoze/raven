import { LoginForm } from '@/components';
import Logo from '@/assets/images/logo.svg';
import styles from './Login.module.scss';

export const Login = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <img src={Logo} alt="Brand logo" />
      <LoginForm />
    </div>
  );
};
