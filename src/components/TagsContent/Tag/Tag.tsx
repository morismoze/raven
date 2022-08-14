import { formatNumber } from '@/utils';
import { Link } from 'wouter';
import styles from './Tag.module.scss';

interface ITagProps {
  name: string;
  postsCount: number;
}

export const Tag = ({ name, postsCount }: ITagProps): JSX.Element => {
  const formattedPostsCount = formatNumber(postsCount);

  return (
    <Link href={`/t/${name}`}>
      <a className={styles.root}>
        <span className={styles.root__tag}>{name}</span>
        <span className={styles.root__postsCount}>
          {formattedPostsCount} posts
        </span>
      </a>
    </Link>
  );
};
