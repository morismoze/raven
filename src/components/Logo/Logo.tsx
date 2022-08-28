import { Link } from 'wouter';

import { ReactComponent as LogoIcon } from '@/assets/images/logo.svg';
import { ReactComponent as LogoReducedIcon } from '@/assets/images/logo-reduced.svg';
import styles from './Logo.module.scss';

interface ILogoProps {
  reduced?: boolean;
}

export const Logo = ({ reduced = false }: ILogoProps): JSX.Element => {
  return (
    <Link href="/" className={styles.root}>
      <a className={styles.root__link}>
        {reduced ? (
          <LogoReducedIcon className={styles.root__icon} />
        ) : (
          <LogoIcon className={styles.root__icon} />
        )}
      </a>
    </Link>
  );
};
