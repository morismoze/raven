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

const IMAGE_SIZE = 64;

export const NewPostCard = ({
  post,
  onClick,
}: INewPostCardProps): JSX.Element => {
  const formattedCreatedAt = formatCreatedAt(post?.createdAt);

  return (
    <Link href={`/p/${post?.webId}`} onClick={onClick}>
      <a className={styles.root}>
        <div
          className={styles.root__imageWrapper}
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        >
          <Image
            blurhash={post?.coverBlurHash}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            src={post?.coverUrl}
            alt={post?.title}
            className={styles.root__img}
            errorClassName={styles.root__imgError}
          />
        </div>
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
