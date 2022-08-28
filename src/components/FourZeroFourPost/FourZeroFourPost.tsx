import { Link, useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import { Button, ButtonSize, ButtonAction } from '@/components';
import styles from './FourZeroFourPost.module.scss';

interface IFourZeroFourPostProps {
  text: string;
}

export const FourZeroFourPost = ({ text }: IFourZeroFourPostProps) => {
  const [, setLocation] = useLocation();

  return (
    <FadeIn className={styles.root}>
      <span className={styles.root__fourZeroFour}>404</span>
      <span className={styles.root__subText}>Something's wrong.</span>
      <span className={styles.root__text}>{text}</span>
      <Link href="/">
        <a className={styles.root__homeLink}>
          <Button size={ButtonSize.small} action={ButtonAction.primary}>
            Back to homepage
          </Button>
        </a>
      </Link>
    </FadeIn>
  );
};
