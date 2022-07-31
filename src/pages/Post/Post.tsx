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
    },
  );
  console.log(post?.data);

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <div className={styles.root__activityPostContainer}>
          <ActivityBar />
          <PostContent />
        </div>
        <div className={styles.root__trendingContainer}></div>
      </HeaderLayout>
    </>
  );
};
