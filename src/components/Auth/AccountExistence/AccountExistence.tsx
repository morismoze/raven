import { Link } from 'wouter';
import styles from './AccountExistence.module.scss';

interface AccountExistenceProps {
  preText: string;
  linkText: string;
  link: string;
}

export const AccountExistence = ({
  preText,
  linkText,
  link,
}: AccountExistenceProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.root__preText}>
        {preText}{' '}
        <Link to={link} className={styles.root__link}>
          {linkText}
        </Link>
      </span>
    </div>
  );
};
