import { SectionTitle, NewPostCard } from '@/components';
import { NewestPost } from '@/api';
import styles from './NewestPostsContent.module.scss';

interface INewestPostsContentProps {
  posts?: NewestPost[];
}

export const NewestPostsContent = ({
  posts,
}: INewestPostsContentProps): JSX.Element => {
  const handleOnPostCardClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.root}>
      <SectionTitle>Top 20 newest posts</SectionTitle>
      <div className={styles.root__postsContainer}>
        {posts?.map((post: NewestPost, index) => (
          <NewPostCard
            post={post}
            key={index}
            onClick={handleOnPostCardClick}
          />
        ))}
      </div>
    </div>
  );
};
