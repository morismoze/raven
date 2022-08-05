import Headroom from 'react-headroom';
import {
  PlusSquareFill,
  PersonFill,
  KeyFill,
  BoxArrowRight,
} from 'react-bootstrap-icons';

import { Button, ButtonAction, Logo, Avatar } from '@/components';
import styles from './Header.module.scss';
import { useLocation } from 'wouter';
import { useAuth, User } from '@/api';

export const Header = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const { user, logout } = useAuth();

  const userPrincipal = user?.data as User;

  const handleAddNewPost = () => {
    setLocation('/upload');
  };

  const handleSignIn = () => {
    setLocation('/signin');
  };

  const handleSignUp = () => {
    setLocation('/signup');
  };

  const handleLogout = () => {
    logout();
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
          {userPrincipal ? (
            <>
              <Button
                action={ButtonAction.primary}
                onClick={handleLogout}
                Icon={BoxArrowRight}
              >
                Log out
              </Button>
              <Avatar id={userPrincipal.id} username={userPrincipal.username} />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </header>
    </Headroom>
  );
};
