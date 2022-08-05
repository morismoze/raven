import { ActivityBar, ShareButton, CommentsRefButton } from '@/components';
import styles from './Sidebar.module.scss';

interface ISidebarProps {
  votesCount?: number;
  commentsSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  totalCommentsCount?: number;
}

export const Sidebar = ({
  votesCount,
  commentsSectionRef,
  totalCommentsCount,
}: ISidebarProps): JSX.Element => {
  const handleOnUpvote = () => {};

  const handleOnDownvote = () => {};

  const handleOnFavorize = () => {};

  const handleOnShare = () => {};

  return (
    <div className={styles.root}>
      <ActivityBar
        votes={votesCount}
        onUpvote={handleOnUpvote}
        onDownvote={handleOnDownvote}
        onFavorize={handleOnFavorize}
      />
      <ShareButton onClick={handleOnShare} />
      <CommentsRefButton
        commentsSectionRef={commentsSectionRef}
        comments={totalCommentsCount}
      />
    </div>
  );
};
