import classNames from 'classnames';
import toast from 'react-hot-toast';

import { ReactComponent as Vote } from '@/assets/icons/vote.svg';
import styles from './VoteButton.module.scss';
import { useAuth, User } from '@/api';

export enum VoteAction {
  upvote = 'upvote',
  downvote = 'downvote',
}

interface IVoteButtonProps {
  action: VoteAction;
  onClick: () => void;
  isActive?: boolean;
  size?: number;
}

export const VoteButton = ({
  action,
  onClick,
  isActive,
  size,
}: IVoteButtonProps): JSX.Element => {
  const { user } = useAuth();

  const userPrincipal = user?.data as User;

  const handleOnClick = () => {
    if (!userPrincipal) {
      toast.error('You have to be logged in order to vote', {
        style: {
          color: 'var(--error)',
          fontSize: 13,
        },
      });
    } else {
      onClick();
    }
  };

  return (
    <Vote
      onClick={handleOnClick}
      className={classNames(
        styles.root,
        { [styles.upvote]: action === VoteAction.upvote },
        { [styles.downvote]: action === VoteAction.downvote },
        {
          [styles['upvote--active']]: isActive && action === VoteAction.upvote,
        },
        {
          [styles['downvote--active']]:
            isActive && action === VoteAction.downvote,
        },
      )}
      style={{ width: size, height: size }}
    />
  );
};
