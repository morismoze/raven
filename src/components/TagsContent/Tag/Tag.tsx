import { Link } from 'wouter';

import { formatNumber } from '@/utils';
import styles from './Tag.module.scss';

interface ITagProps {
  name: string;
  displayName: string;
  postsCount: number;
}

export const Tag = ({
  name,
  displayName,
  postsCount,
}: ITagProps): JSX.Element => {
  const formattedPostsCount = formatNumber(postsCount);

  return (
    <Link href={`/t/${name}`}>
      <a className={styles.root}>
        <span className={styles.root__tag}>{displayName}</span>
        <span className={styles.root__postsCount}>
          {formattedPostsCount} posts
        </span>
      </a>
    </Link>
  );
};
