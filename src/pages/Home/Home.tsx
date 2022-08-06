import { useInfiniteQuery } from 'react-query';

import { Header, HeaderLayout } from '@/components';
import { fetchPosts, PostsResponseDto } from '@/api';

export const Home = (): JSX.Element => {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostsResponseDto>(
    'fetch-post-comments',
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
      <HeaderLayout>
        <div></div>
      </HeaderLayout>
    </>
  );
};
