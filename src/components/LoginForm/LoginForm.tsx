import { Google } from 'react-bootstrap-icons';

import { Button, ButtonSize, ButtonAction } from '@/components';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const handleInstagramAuth = () => {
    // google auth
  };

  return (
    <div className={styles.root}>
      <Button
        onClick={handleInstagramAuth}
        size={ButtonSize.large}
        text="Sign in with Google"
        action={ButtonAction.primary}
        Icon={Google}
      />
    </div>
  );
};
