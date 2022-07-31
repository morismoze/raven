import { useRoute } from 'wouter';
import { useQuery } from 'react-query';

import { ActivityBar, Header, HeaderLayout, PostContent } from '@/components';
import { fetchPost, PostResponseDto } from '@/api';
import styles from './Post.module.scss';

export const Post = (): JSX.Element => {
  const [match, params] = useRoute('/p/:postId');

  const { data: post } = useQuery<PostResponseDto>(
    'fetch-post',
    () => fetchPost(params!.postId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );

  const handleOnUpvote = () => {};

  const handleOnDownvote = () => {};

  const handleOnFavorize = () => {};

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <div className={styles.root__activityPostContainer}>
          <ActivityBar
            votes={post?.data.votes}
            onUpvote={handleOnUpvote}
            onDownvote={handleOnDownvote}
            onFavorize={handleOnFavorize}
          />
          <PostContent />
        </div>
        <div className={styles.root__trendingContainer}></div>
      </HeaderLayout>
    </>
  );
};
