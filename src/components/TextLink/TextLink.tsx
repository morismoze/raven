import classNames from 'classnames';
import { Link } from 'wouter';

import styles from './TextLink.module.scss';

interface ITextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const TextLink = ({
  href,
  children,
  className,
}: ITextLinkProps): JSX.Element => {
  return (
    <Link href={href} className={classNames(styles.root, className)}>
      {children}
    </Link>
  );
};
