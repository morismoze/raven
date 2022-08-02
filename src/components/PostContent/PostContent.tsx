import { Link } from 'wouter';

import {
  Title,
  Meta,
  Cover,
  Chip,
  ChipAction,
  AuthToComment,
} from '@/components';
import { Post, useAuth, User } from '@/api';
import styles from './PostContent.module.scss';

interface IPostContentProps {
  post?: Post;
}

export const PostContent = ({ post }: IPostContentProps): JSX.Element => {
  const { user } = useAuth();
  const userPrincipal = user?.data as User;

  return (
    <div className={styles.root}>
      <Title>{post?.title}</Title>
      <Meta
        userId={post?.userId}
        username={post?.username}
        views={post?.views}
        createdAt={post?.createdAt}
      />
      <Cover url={post?.coverUrl} alt={post?.title} />
      <div className={styles.root__tagsContainer}>
        {post?.tags.map((tag, index) => (
          <Link href={`/t/${tag.tagName.toLowerCase}`} key={index}>
            <a className={styles.root__tagLink}>
              <Chip
                action={ChipAction.primary}
                text={tag.tagName}
                key={index}
              />
            </a>
          </Link>
        ))}
      </div>
      {userPrincipal && <AuthToComment />}
    </div>
  );
};
