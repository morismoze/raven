import { useMutation, useQueryClient } from 'react-query';

import {
  VoteButton,
  VoteAction,
  FavorizeButton,
  AlternateLoader,
} from '@/components';
import { downvotePost, PostVoteResponseDto, upvotePost } from '@/api';
import styles from './ActivityBar.module.scss';

interface IVotingBar {
  postId?: string;
  userPrincipalUpvoted?: boolean;
  userPrincipalDownvoted?: boolean;
  votes?: number;
}

export const ActivityBar = ({
  postId,
  userPrincipalUpvoted,
  userPrincipalDownvoted,
  votes,
}: IVotingBar): JSX.Element => {
  const queryClient = useQueryClient();

  const { mutate: upvoteMutate, isLoading: isUpvoteMutateLoading } =
    useMutation<PostVoteResponseDto, unknown>(
      'upvote-post',
      () => upvotePost(postId!),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('fetch-post');
        },
      },
    );

  const { mutate: downvoteMutate, isLoading: isDownvoteMutateLoading } =
    useMutation<PostVoteResponseDto, unknown>(
      'downvote-post',
      () => downvotePost(postId!),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('fetch-post');
        },
      },
    );

  const handleOnUpvote = () => {
    upvoteMutate();
  };

  const handleOnDownvote = () => {
    downvoteMutate();
  };

  const handleOnFavorize = () => {};

  return (
    <div className={styles.root}>
      <VoteButton
        action={VoteAction.upvote}
        onClick={handleOnUpvote}
        isActive={userPrincipalUpvoted}
      />
      {!isUpvoteMutateLoading && !isDownvoteMutateLoading && (
        <span className={styles.root__votes}>{votes}</span>
      )}
      <AlternateLoader
        isLoading={isUpvoteMutateLoading || isDownvoteMutateLoading}
        size={18}
      />
      <VoteButton
        action={VoteAction.downvote}
        onClick={handleOnDownvote}
        isActive={userPrincipalDownvoted}
      />
      <FavorizeButton onClick={handleOnFavorize} />
    </div>
  );
};
