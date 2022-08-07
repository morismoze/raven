import { useInfiniteQuery } from 'react-query';

import { Header, HeaderLayout, PostsContent } from '@/components';
import { fetchPosts, PostsResponseDto } from '@/api';
import styles from './Home.module.scss';

export const Home = (): JSX.Element => {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostsResponseDto>(
    'fetch-posts',
    ({ pageParam = 0 }) => fetchPosts(pageParam),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.nextPage) {
          return false;
        } else {
          return lastPage.data.nextPage;
        }
      },
    },
  );

  const refetchPostsPage = (pageToRefetch: number) => {
    refetch({ refetchPage: (page, index) => index === pageToRefetch });
  };

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <PostsContent
          postsGroups={posts?.pages}
          hasMorePosts={hasNextPage}
          onLoadMorePosts={fetchNextPage}
          isMorePostsRefetching={isFetchingNextPage}
        />
      </HeaderLayout>
    </>
  );
};
