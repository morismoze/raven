import Headroom from 'react-headroom';
import { PlusSquareFill, PersonFill, KeyFill } from 'react-bootstrap-icons';

import { Button, ButtonAction, Logo } from '@/components';
import styles from './Header.module.scss';
import { useLocation } from 'wouter';

export const Header = () => {
  const [location, setLocation] = useLocation();

  const handleAddNewPost = () => {
    setLocation('/upload');
  };
  const handleSignIn = () => {
    setLocation('/signin');
  };
  const handleSignUp = () => {
    setLocation('/signup');
  };

  return (
    <Headroom>
      <header className={styles.root}>
        <div className={styles.root__mainContainer}>
          <Logo />
          <Button
            action={ButtonAction.primary}
            onClick={handleAddNewPost}
            Icon={PlusSquareFill}
          >
            New Post
          </Button>
        </div>
        <div className={styles.root__authContainer}>
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
      </header>
    </Headroom>
  );
};
