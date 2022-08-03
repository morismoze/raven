import { useRef, useState } from 'react';

import { useRoute } from 'wouter';
import { useQuery } from 'react-query';

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
  const [commentsPage, setCommentsPage] = useState<number>(0);

  const [, params] = useRoute('/p/:postId');

  const commentsRef = useRef<HTMLDivElement>();

  const { data: post } = useQuery<PostResponseDto>(
    'fetch-post',
    () => fetchPost(params!.postId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );

  const { data: postComments } = useQuery<PostCommentsResponseDto>(
    'fetch-post-comments',
    () => fetchPostComments(params!.postId, commentsPage),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <div className={styles.root__activityPostContainer}>
          <Sidebar
            votesCount={post?.data.votes}
            commentsCount={postComments?.data.count}
            commentsSectionRef={commentsRef}
          />
          <div className={styles.root__postCommentsContainer}>
            <PostContent post={post?.data} />
            <PostCommentsContent
              postId={post?.data.webId}
              comments={postComments?.data}
            />
          </div>
        </div>
        <div className={styles.root__trendingContainer}></div>
      </HeaderLayout>
    </>
  );
};
