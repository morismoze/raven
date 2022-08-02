import { Button, ButtonAction } from '@/components';
import { KeyFill, PersonFill } from 'react-bootstrap-icons';
import { useLocation } from 'wouter';

import styles from './AuthToComment.module.scss';

export const AuthToComment = () => {
  const [, setLocation] = useLocation();

  const handleSignIn = () => {
    setLocation('/signin');
  };

  const handleSignUp = () => {
    setLocation('/signup');
  };

  return (
    <div className={styles.root}>
      <span className={styles.root__text}>Sign in to leave a comment</span>
      <div className={styles.root__actions}>
        <Button
          action={ButtonAction.primary}
          onClick={handleSignIn}
          Icon={PersonFill}
        >
          Sign In
        </Button>
        <Button
          action={ButtonAction.primary}
          onClick={handleSignUp}
          Icon={KeyFill}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
