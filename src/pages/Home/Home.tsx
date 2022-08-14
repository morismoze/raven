import { useInfiniteQuery, useQuery } from 'react-query';

import { Header, HeaderLayout, PostsContent, TagsContent } from '@/components';
import {
  AllTagsResponseDto,
  fetchAllTags,
  fetchPosts,
  PostsResponseDto,
  Tag,
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
      <Header />
      <HeaderLayout className={styles.root}>
        <TagsContent tags={tags?.data} />
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
