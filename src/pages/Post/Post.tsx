import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { useRoute } from 'wouter';
import { useInfiniteQuery, useQuery } from 'react-query';

import {
  Sidebar,
  Header,
  HeaderLayout,
  PostContent,
  PostCommentsContent,
} from '@/components';
import {
  fetchPost,
  fetchPostComments,
  PostCommentsResponseDto,
  PostResponseDto,
} from '@/api';
import styles from './Post.module.scss';

export const Post = (): JSX.Element => {
  const [, params] = useRoute('/p/:postId');

  const commentsRef = useRef<HTMLDivElement>(null);

  const { data: post } = useQuery<PostResponseDto>(
    'fetch-post',
    () => fetchPost(params!.postId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );

  const {
    data: postCommentsGroups,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostCommentsResponseDto>(
    'fetch-post-comments',
    ({ pageParam = 0 }) => fetchPostComments(params!.postId, pageParam),
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

  const refetchCommentsPage = (pageToRefetch: number) => {
    refetch({ refetchPage: (_, index) => index === pageToRefetch });
  };

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
        <div className={styles.root__trendingContainer}></div>
      </HeaderLayout>
    </>
  );
};
