import { Title, Meta, Cover } from '@/components';
import { Post } from '@/api';
import styles from './PostContent.module.scss';

interface IPostContentProps {
  post?: Post;
}

export const PostContent = ({ post }: IPostContentProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <Title>{post?.title}</Title>
      <Meta
        username={post?.username}
        views={post?.views}
        createdAt={post?.createdAt}
      />
      <Cover url={post?.coverUrl} alt={post?.title} />
    </div>
  );
};
