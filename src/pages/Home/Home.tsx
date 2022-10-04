import { Helmet } from 'react-helmet-async';
import { useInfiniteQuery, useQuery } from 'react-query';

import {
  Header,
  HeaderLayout,
  PostsContent,
  TagsContent,
  EmptyPostsData,
} from '@/components';
import {
  AllTagsResponseDto,
  fetchAllTags,
  fetchPosts,
  PostsResponseDto,
} from '@/api';
import styles from './Home.module.scss';

export const Home = (): JSX.Element => {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<PostsResponseDto>(
    'fetch-posts',
    ({ pageParam = 0 }) => fetchPosts(pageParam),
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

  const { data: tags } = useQuery<AllTagsResponseDto>(
    'fetch-all-tags',
    fetchAllTags,
    {
      refetchOnMount: true,
    },
  );

  return (
    <>
      <Helmet>
        <title>Raven &bull; Home</title>
      </Helmet>
      <Header />
      <HeaderLayout className={styles.root}>
        <TagsContent tags={tags?.data} />
        {posts?.pages[0].data.count === 0 ? (
          <EmptyPostsData />
        ) : (
          <PostsContent
            postsGroups={posts?.pages}
            hasMorePosts={hasNextPage}
            onLoadMorePosts={fetchNextPage}
            isMorePostsRefetching={isFetchingNextPage}
          />
        )}
      </HeaderLayout>
    </>
  );
};
