import { useInfiniteQuery } from 'react-query';
import { useRoute } from 'wouter';

import { Header, PostsContent } from '@/components';
import { fetchPostsByTagName, PostsResponseDto } from '@/api';
import { formatNumber } from '@/utils';
import styles from './TagPosts.module.scss';

export const TagPosts = (): JSX.Element => {
  const [, params] = useRoute('/t/:tagName');

  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<PostsResponseDto>(
    'fetch-posts-by-tagName',
    ({ pageParam = 0 }) => fetchPostsByTagName(params!.tagName, pageParam),
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.nextPage) {
          return false;
        } else {
          return lastPage.data.nextPage;
        }
      },
    },
  );

  const tagDisplayName = params?.tagName.replaceAll('_', ' ');

  const formattedPostsCount = formatNumber(posts?.pages[0].data.count);

  return (
    <>
      <Header />
      <div className={styles.root}>
        <span className={styles.root__metaContainer}>
          <span className={styles.root__tag}>{tagDisplayName}</span>
          <span className={styles.root__separator}>&bull;</span>
          <span className={styles.root__postsCount}>
            {formattedPostsCount} posts
          </span>
        </span>
        <PostsContent
          postsGroups={posts?.pages}
          hasMorePosts={hasNextPage}
          onLoadMorePosts={fetchNextPage}
          isMorePostsRefetching={isFetchingNextPage}
        />
      </div>
    </>
  );
};
