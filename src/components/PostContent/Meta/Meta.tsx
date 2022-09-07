import { Avatar } from '@/components/Avatar/Avatar';
import { formatNumber, formatCreatedAt } from '@/utils';
import styles from './Meta.module.scss';

interface IMetaProps {
  userId?: number;
  username?: string;
  views?: number;
  createdAt?: string;
}

export const Meta = ({ userId, username, views, createdAt }: IMetaProps) => {
  const formattedViews = formatNumber(views);

  const formattedCreatedAt = formatCreatedAt(createdAt);

  return (
    <div className={styles.root}>
      <Avatar id={userId} username={username} />
      <div className={styles.root__dataWrapper}>
        <span className={styles.root__username}>{username}</span>
        <div className={styles.root__dataContainer}>
          <span className={styles.root__views}>
            {formattedViews || '-'} views
          </span>
          <span className={styles.root__separator}>&bull;</span>
          <span className={styles.root__createdAt}>{formattedCreatedAt}</span>
        </div>
      </div>
    </div>
  );
};
