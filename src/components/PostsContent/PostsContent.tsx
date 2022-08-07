import { useAutoAnimate } from '@formkit/auto-animate/react';

import { PostsResponseDto, ReducedPost } from '@/api';
import {
  PostCard,
  Button,
  ButtonAction,
  ButtonSize,
  AlternateLoader,
} from '@/components';
import styles from './PostsContent.module.scss';

interface IPostsContentProps {
  postsGroups?: PostsResponseDto[];
  hasMorePosts?: boolean;
  onLoadMorePosts: () => void;
  isMorePostsRefetching: boolean;
}

const GRID_ROW_HEIGHT = 0;
const GRID_GAP = 15;

export const PostsContent = ({
  postsGroups,
  hasMorePosts,
  onLoadMorePosts,
  isMorePostsRefetching,
}: IPostsContentProps) => {
  const [parent] = useAutoAnimate();

  return (
    <div className={styles.root}>
      <div
        ref={parent as React.RefObject<HTMLDivElement>}
        className={styles.root__postsContainer}
        style={{
          gridAutoRows: `${GRID_ROW_HEIGHT}px`,
          gridGap: `${GRID_GAP}px`,
        }}
      >
        {postsGroups?.map((group: PostsResponseDto) => {
          return group.data.posts.map((post: ReducedPost, index) => (
            <PostCard
              post={post}
              gridRowHeight={GRID_ROW_HEIGHT}
              gridGap={GRID_GAP}
              key={index}
            />
          ));
        })}
      </div>
      {hasMorePosts && (
        <Button
          size={ButtonSize.small}
          action={ButtonAction.primary}
          onClick={onLoadMorePosts}
          disabled={isMorePostsRefetching}
          className={styles.root__morePostsButton}
        >
          <div className={styles.root__loadMoreContainer}>
            <span>Load more posts</span>
            <AlternateLoader isLoading={isMorePostsRefetching} />
          </div>
        </Button>
      )}
    </div>
  );
};
