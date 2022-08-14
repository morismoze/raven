import { Link } from 'wouter';
import styles from './Tag.module.scss';

interface ITagProps {
  name: string;
}

export const Tag = ({ name }: ITagProps): JSX.Element => {
  return (
    <Link href={`/t/${name}`}>
      <a className={styles.root}>
        <span className={styles.root__tag}>{name}</span>
      </a>
    </Link>
  );
};
