import {
  AccountExistence,
  AuthCard,
  LoginForm,
  LoginFormValues,
} from '@/components';
import { useAuth } from '@/api';
import styles from './Login.module.scss';

export const Login = (): JSX.Element => {
  const { login, isLoggingIn } = useAuth();

  const handleLogin = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className={styles.root}>
      <AuthCard
        form={LoginForm}
        onAuth={handleLogin}
        isAuthenticating={isLoggingIn}
      />
      <AccountExistence
        preText="Don't have an account?"
        linkText="Sign up"
        link="/signup"
      />
    </div>
  );
};
