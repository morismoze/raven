import { useCallback, useEffect, useRef } from 'react';

import { Link } from 'wouter';
import { Eye } from 'react-bootstrap-icons';

import { Image } from '@/components';
import { ReactComponent as Votes } from '@/assets/icons/vote.svg';
import { ReactComponent as Comments } from '@/assets/icons/comments.svg';
import { ReducedPost } from '@/api';
import styles from './PostCard.module.scss';

interface IPostCardProps {
  post: ReducedPost;
  gridRowHeight: number;
  gridColumnWidth: number;
  gridGap: number;
}

const META_DATA_HEIGHT = 61;

export const PostCard = ({
  post,
  gridRowHeight,
  gridColumnWidth,
  gridGap,
}: IPostCardProps) => {
  const cardRootRef = useRef<HTMLDivElement>(null);

  const cardContentRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (post) {
      const CARD_HEIGHT =
        META_DATA_HEIGHT +
        gridColumnWidth / (post.coverWidth / post.coverHeight);

      const rowSpan = Math.ceil(
        (CARD_HEIGHT + gridGap) / (gridRowHeight + gridGap),
      );
      cardRootRef.current!.style.gridRowEnd = `span ${rowSpan}`;
    }
  }, [post]);

  return (
    <div ref={cardRootRef} id={post.webId} className={styles.root}>
      <Link href={`/p/${post.webId}`}>
        <a ref={cardContentRef} className={styles.root__link}>
          <Image
            src={post.coverUrl}
            alt={post.title}
            blurhash={post.coverBlurHash}
            width={post.coverWidth}
            height={post.coverHeight}
            className={styles.root__img}
          />
          <div
            className={styles.root__metaContainer}
            style={{ height: `${META_DATA_HEIGHT}` }}
          >
            <span className={styles.root__title}>{post.title}</span>
            <div className={styles.root__metaDataWrapper}>
              <div className={styles.root__votesContainer}>
                <Votes className={styles.root__metaIcon} />
                <span className={styles.root__metaData}>{post.votes}</span>
              </div>
              <div className={styles.root__commentsContainer}>
                <Comments className={styles.root__metaIcon} />
                <span className={styles.root__metaData}>{post.comments}</span>
              </div>
              <div className={styles.root__viewsContainer}>
                <Eye className={styles.root__metaIcon} />
                <span className={styles.root__metaData}>{post.views}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
