import { useCallback, useRef } from 'react';

import { Link } from 'wouter';
import { Eye } from 'react-bootstrap-icons';

import { ReactComponent as Votes } from '@/assets/icons/vote.svg';
import { ReactComponent as Comments } from '@/assets/icons/comments.svg';
import { ReducedPost } from '@/api';
import styles from './PostCard.module.scss';

interface IPostCardProps {
  post: ReducedPost;
  gridRowHeight: number;
  gridGap: number;
}

export const PostCard = ({ post, gridRowHeight, gridGap }: IPostCardProps) => {
  const cardRootRef = useRef<HTMLDivElement>(null);

  const cardContentRef = useRef<HTMLAnchorElement>(null);

  const handleOnLoad = useCallback(() => {
    const rowSpan = Math.ceil(
      (cardContentRef.current!.getBoundingClientRect().height! + gridGap) /
        (gridRowHeight + gridGap),
    );
    cardRootRef.current!.style.gridRowEnd = `span ${rowSpan}`;
  }, []);

  return (
    <div ref={cardRootRef} id={post.webId} className={styles.root}>
      <Link href={`/p/${post.webId}`} className={styles.root__linkWrapper}>
        <a ref={cardContentRef} className={styles.root__link}>
          <img
            src={post.coverUrl}
            alt={post.title}
            onLoad={handleOnLoad}
            className={styles.root__img}
          />
          <div className={styles.root__metaContainer}>
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
