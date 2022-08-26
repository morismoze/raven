import { TextLink } from '@/components';
import styles from './ToS.module.scss';

export const ToS = (): JSX.Element => {
  return (
    <span className={styles.root}>
      By continuing, You agree to our{' '}
      <TextLink href="#" className={styles.root_link}>
        Terms of Service
      </TextLink>{' '}
      and{' '}
      <TextLink href="#" className={styles.root_link}>
        Privacy policy
      </TextLink>
      .
    </span>
  );
};
