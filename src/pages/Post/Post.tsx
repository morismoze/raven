import { useEffect, useRef } from 'react';

import { useRoute } from 'wouter';
import { useInfiniteQuery, useQuery } from 'react-query';

import {
  Sidebar,
  Header,
  HeaderLayout,
  PostContent,
  PostCommentsContent,
  NewestPostsContent,
} from '@/components';
import {
  fetchNewest20Posts,
  fetchPost,
  fetchPostComments,
  Newest20PostsResponseDto,
  PostCommentsResponseDto,
  PostResponseDto,
} from '@/api';
import styles from './Post.module.scss';

export const Post = (): JSX.Element => {
  const [, params] = useRoute('/p/:postId');

  const commentsRef = useRef<HTMLDivElement>(null);

  const { data: post } = useQuery<PostResponseDto>(
    ['fetch-post', params],
    () => fetchPost(params!.postId),
    {
      refetchOnMount: true,
    },
  );

  const {
    data: postCommentsGroups,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostCommentsResponseDto>(
    ['fetch-post-comments', params],
    ({ pageParam = 0 }) => fetchPostComments(params!.postId, pageParam),
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

  const { data: newestPosts } = useQuery<Newest20PostsResponseDto>(
    'fetch-newest-20-posts',
    () => fetchNewest20Posts(),
    {
      refetchOnMount: true,
    },
  );

  const refetchCommentsPage = (pageToRefetch: number) => {
    refetch({ refetchPage: (_, index) => index === pageToRefetch });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <div className={styles.root__activityPostContainer}>
          <Sidebar
            postId={post?.data.webId}
            userPrincipalUpvoted={post?.data.userPrincipalUpvoted}
            userPrincipalDownvoted={post?.data.userPrincipalDownvoted}
            votesCount={post?.data.votes}
            totalCommentsCount={postCommentsGroups?.pages[0].data.count}
            commentsSectionRef={commentsRef}
          />
          <div className={styles.root__postCommentsContainer}>
            <PostContent post={post?.data} />
            <PostCommentsContent
              postId={post?.data.webId}
              commentsGroups={postCommentsGroups?.pages}
              hasMoreComments={hasNextPage}
              totalCommentsCount={postCommentsGroups?.pages[0].data.count}
              commentsRef={commentsRef}
              onLoadMoreComments={fetchNextPage}
              isMoreCommentsRefetching={isFetchingNextPage}
              refetchPage={refetchCommentsPage}
            />
          </div>
        </div>
        <NewestPostsContent posts={newestPosts?.data} />
      </HeaderLayout>
    </>
  );
};
