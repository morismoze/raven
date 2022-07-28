import { Link } from 'wouter';
import styles from './AccountExistence.module.scss';

interface IAccountExistenceProps {
  preText: string;
  linkText: string;
  link: string;
}

export const AccountExistence = ({
  preText,
  linkText,
  link,
}: IAccountExistenceProps) => {
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
