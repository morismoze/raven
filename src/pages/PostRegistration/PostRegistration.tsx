import styles from './PostRegistration.module.scss';

export const PostRegistration = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <span className={styles.root__text}>
        Great! Thank you for registering on{' '}
        <span className={styles.root__logo}>raven</span>!
      </span>
      <span className={styles.root__text}>
        We've reserved your space and sent you an activation link to your email
        address. Be sure to check it out!
      </span>
    </div>
  );
};
