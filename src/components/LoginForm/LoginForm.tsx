import { Google, Twitter, Facebook } from 'react-bootstrap-icons';

import { Button, ButtonSize, ButtonAction, ToS } from '@/components';
import styles from './LoginForm.module.scss';

export const LoginForm = (): JSX.Element => {
  const handleGoogleAuth = () => {
    // google auth
  };

  const handleFacebookAuth = () => {
    // facebook auth
  };

  const handleTwitterAuth = () => {
    // twitter auth
  };

  return (
    <div className={styles.root}>
      <Button
        onClick={handleGoogleAuth}
        size={ButtonSize.large}
        text="Sign in with Google"
        action={ButtonAction.primary}
        Icon={Google}
      />
      <span className={styles.root__alternativeBinder}>Or continue with</span>
      <div className={styles.root__alternativeContainer}>
        <Button
          onClick={handleFacebookAuth}
          size={ButtonSize.small}
          text="Facebook"
          action={ButtonAction.secondary}
          Icon={Facebook}
        />
        <Button
          onClick={handleTwitterAuth}
          size={ButtonSize.small}
          text="Twitter"
          action={ButtonAction.secondary}
          Icon={Twitter}
        />
      </div>
      <ToS />
    </div>
  );
};
