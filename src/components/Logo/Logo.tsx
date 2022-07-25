import { Link } from 'wouter';

import { ReactComponent as LogoIcon } from '@/assets/images/logo-reduced.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link href="/" className={styles.root}>
      <a className={styles.root__link}>
        <LogoIcon className={styles.root__icon} />
      </a>
    </Link>
  );
};
