import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useRoute } from 'wouter';

import {
  Header,
  HeaderLayout,
  PostsContent,
  EmptyPostsData,
  FourZeroFourPost,
} from '@/components';
import { fetchPostsByTagName, PostsResponseDto } from '@/api';
import { formatNumber } from '@/utils';
import styles from './TagPosts.module.scss';

const FOUR_ZERO_FOUR_TAG_POSTS =
  "The tag you were trying to access doesn't exist.";

export const TagPosts = (): JSX.Element | undefined => {
  const [, params] = useRoute('/t/:tagName');

  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isSuccess,
    error,
  } = useInfiniteQuery<PostsResponseDto, AxiosError>(
    'fetch-posts-by-tagName',
    ({ pageParam = 0 }) => fetchPostsByTagName(params!.tagName, pageParam),
    {
      refetchOnMount: true,
      retry: false,
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

  if (error?.response?.status === 404) {
    return (
      <>
        <Header />
        <HeaderLayout className={styles.fourZeroFourWrapper}>
          <FourZeroFourPost text={FOUR_ZERO_FOUR_TAG_POSTS} />
        </HeaderLayout>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <HeaderLayout className={styles.root}>
          <div className={styles.root__metaContainer}>
            <span className={styles.root__tag}>{tagDisplayName}</span>
            <span className={styles.root__postsCount}>
              {formattedPostsCount} posts
            </span>
          </div>
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
  }
};
