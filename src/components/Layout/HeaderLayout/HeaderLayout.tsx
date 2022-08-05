import classNames from 'classnames';
import styles from './HeaderLayout.module.scss';

type HeaderLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export const HeaderLayout = ({
  className,
  children,
}: HeaderLayoutProps): JSX.Element => {
  return <div className={classNames(styles.root, className)}>{children}</div>;
};
