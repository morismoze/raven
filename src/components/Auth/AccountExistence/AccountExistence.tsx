import { TextLink } from '@/components';
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
}: IAccountExistenceProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <span className={styles.root__preText}>
        {preText} <TextLink href={link}>{linkText}</TextLink>
      </span>
    </div>
  );
};
