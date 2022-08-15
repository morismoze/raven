import { Link } from 'wouter';
import { Clock } from 'react-bootstrap-icons';

import { Image } from '@/components';
import { NewestPost } from '@/api';
import { formatCreatedAt } from '@/utils';
import styles from './NewPostCard.module.scss';

interface INewPostCardProps {
  post?: NewestPost;
  onClick: () => void;
}

export const NewPostCard = ({
  post,
  onClick,
}: INewPostCardProps): JSX.Element => {
  const formattedCreatedAt = formatCreatedAt(post?.createdAt);

  return (
    <Link href={`/p/${post?.webId}`} onClick={onClick}>
      <a className={styles.root}>
        <Image
          src={post?.coverUrl}
          alt={post?.title}
          className={styles.root__cover}
        />
        <div className={styles.root__dataContainer}>
          <span className={styles.root__title}>{post?.title}</span>
          <div className={styles.root__metadataContainer}>
            <Clock className={styles.root__timeIcon} />
            <span className={styles.root__createdAt}>{formattedCreatedAt}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
