import Headroom from 'react-headroom';
import { PlusSquareFill, PersonFill, KeyFill } from 'react-bootstrap-icons';

import { Button, ButtonAction } from '@/components';
import { ReactComponent as Logo } from '@/assets/images/logo-short.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const handleAddNewPost = () => {};
  const handleSignIn = () => {};
  const handleSignUp = () => {};

  return (
    <Headroom>
      <header className={styles.root}>
        <div className={styles.root__mainContainer}>
          <Logo className={styles.root__logo} />
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
