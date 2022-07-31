import classNames from 'classnames';
import { ReactComponent as Vote } from '@/assets/icons/vote.svg';

import styles from './VoteButton.module.scss';

export enum VoteAction {
  upvote = 'upvote',
  downvote = 'downvote',
}

interface IVoteButtonProps {
  action: VoteAction;
  onClick: () => void;
}

export const VoteButton = ({
  action,
  onClick,
}: IVoteButtonProps): JSX.Element => {
  const handleOnClick = () => {
    onClick();
  };
  return (
    <Vote
      onClick={handleOnClick}
      className={classNames(
        styles.root,
        { [styles.upvote]: action === VoteAction.upvote },
        { [styles.downvote]: action === VoteAction.downvote },
      )}
    />
  );
};
