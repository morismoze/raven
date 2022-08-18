import { useInfiniteQuery } from 'react-query';
import { useRoute } from 'wouter';

import { Header, PostsContent } from '@/components';
import { fetchPostsByTagName, PostsResponseDto } from '@/api';
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

  return (
    <>
      <Header />
      <div className={styles.root}>
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
