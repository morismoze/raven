import { Link } from 'wouter';
import FadeIn from 'react-fade-in';
import classNames from 'classnames';

import { Button, ButtonSize, ButtonAction } from '@/components';
import styles from './Error.module.scss';

interface IFourZeroFourProps {
  title: string;
  text: string;
  reload?: boolean;
  className?: string;
}

// eslint-disable-next-line n/handle-callback-err
export const Error = ({
  title,
  text,
  reload = true,
  className,
}: IFourZeroFourProps): JSX.Element => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <FadeIn className={classNames(styles.root, className)}>
      <span className={styles.root__fourZeroFour}>{title}</span>
      <span className={styles.root__subText}>Something's wrong.</span>
      <span className={styles.root__text}>{text}</span>
      <div className={styles.root__actionsContainer}>
        {reload && (
          <Button
            size={ButtonSize.small}
            action={ButtonAction.primary}
            onClick={handleReload}
          >
            Reload the page
          </Button>
        )}
        <Link href="/" onClick={handleReload}>
          <a className={styles.root__homeLink}>
            <Button size={ButtonSize.small} action={ButtonAction.primary}>
              Back to homepage
            </Button>
          </a>
        </Link>
      </div>
    </FadeIn>
  );
};
