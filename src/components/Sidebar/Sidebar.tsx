import { ActivityBar, ShareButton, CommentsRefButton } from '@/components';
import styles from './Sidebar.module.scss';

interface ISidebarProps {
  postId?: string;
  userPrincipalUpvoted?: boolean;
  userPrincipalDownvoted?: boolean;
  votesCount?: number;
  commentsSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  totalCommentsCount?: number;
}

export const Sidebar = ({
  postId,
  userPrincipalUpvoted,
  userPrincipalDownvoted,
  votesCount,
  commentsSectionRef,
  totalCommentsCount,
}: ISidebarProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <ActivityBar
        postId={postId}
        userPrincipalUpvoted={userPrincipalUpvoted}
        userPrincipalDownvoted={userPrincipalDownvoted}
        votes={votesCount}
      />
      <ShareButton />
      <CommentsRefButton
        commentsSectionRef={commentsSectionRef}
        comments={totalCommentsCount}
      />
    </div>
  );
};
