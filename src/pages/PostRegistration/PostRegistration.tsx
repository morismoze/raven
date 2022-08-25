import FadeIn from 'react-fade-in';

import styles from './PostRegistration.module.scss';

export const PostRegistration = (): JSX.Element => {
  return (
    <FadeIn className={styles.root}>
      <div className={styles.root__contentContainer}>
        <span className={styles.root__text}>
          Great! Thank you for registering on{' '}
          <span className={styles.root__logo}>raven</span>!
        </span>
        <span className={styles.root__text}>
          We've reserved your space and sent you an activation link to your
          email address. Be sure to check it out!
        </span>
      </div>
    </FadeIn>
  );
};
