import { Link } from 'wouter';
import FadeIn from 'react-fade-in';
import classNames from 'classnames';

import { Button, ButtonSize, ButtonAction } from '@/components';
import styles from './Error.module.scss';
import { FallbackProps } from 'react-error-boundary';

type IFourZeroFourProps = FallbackProps & {
  title: string;
  text: string;
  className?: string;
};

// eslint-disable-next-line n/handle-callback-err
export const Error = ({
  title,
  text,
  className,
  ...props
}: IFourZeroFourProps): JSX.Element => {
  const { error, resetErrorBoundary } = props;

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <FadeIn className={classNames(styles.root, className)}>
      <span className={styles.root__fourZeroFour}>{title}</span>
      <span className={styles.root__subText}>Something's wrong.</span>
      <span className={styles.root__text}>{text}</span>
      <div className={styles.root__actionsContainer}>
        <Button
          size={ButtonSize.small}
          action={ButtonAction.primary}
          onClick={handleReload}
        >
          Reload the page
        </Button>
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
