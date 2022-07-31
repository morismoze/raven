import { VoteButton, VoteAction, FavorizeButton } from '@/components';
import styles from './ActivityBar.module.scss';

interface IVotingBar {
  votes?: number;
  onUpvote: () => void;
  onDownvote: () => void;
  onFavorize: () => void;
  vertical?: boolean;
}

export const ActivityBar = ({
  votes,
  onUpvote,
  onDownvote,
  onFavorize,
}: IVotingBar): JSX.Element => {
  return (
    <div className={styles.root}>
      <VoteButton action={VoteAction.upvote} onClick={onUpvote} />
      <span className={styles.root__votes}>
        {votes !== undefined ? votes : '-'}
      </span>
      <VoteButton action={VoteAction.downvote} onClick={onDownvote} />
      <FavorizeButton onClick={onFavorize} />
    </div>
  );
};
