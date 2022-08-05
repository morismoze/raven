import { useMutation } from 'react-query';

import { Avatar, VoteButton, VoteAction, AlternateLoader } from '@/components';
import {
  downvotePostComment,
  PosCommentUpvoteResponseDto,
  PostComment,
  upvotePostComment,
} from '@/api';
import { formatCreatedAt } from '@/utils';
import styles from './Comment.module.scss';

interface ICommentProps {
  postId: string;
  comment: PostComment;
  commentPage: number;
  refetchPage: (pageToRefetch: number) => void;
}

export const Comment = ({
  postId,
  comment,
  commentPage,
  refetchPage,
}: ICommentProps): JSX.Element => {
  const {
    mutate: upvoteMutate,
    data: upvoteData,
    isLoading: isUpvoteMutateLoading,
    reset: upvoteReset,
  } = useMutation<PosCommentUpvoteResponseDto, unknown>(
    'upvote-post-comment',
    () => upvotePostComment(postId, comment.id),
    {
      onSuccess: () => {
        refetchPage(commentPage);
      },
    },
  );

  const {
    mutate: downvoteMutate,
    data: downvoteData,
    isLoading: isDownvoteMutateLoading,
    reset: downvoteReset,
  } = useMutation<PosCommentUpvoteResponseDto, unknown>(
    'downvote-post-comment',
    () => downvotePostComment(postId, comment.id),
    {
      onSuccess: () => {
        refetchPage(commentPage);
      },
    },
  );

  const handleCommentUpvote = () => {
    upvoteMutate();
  };

  const handleCommentDownvote = () => {
    downvoteMutate();
  };

  const formattedCreatedAt = formatCreatedAt(comment.createdAt);

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <Avatar id={comment.userId} username={comment.username} size={25} />
        <span className={styles.root__username}>{comment.username}</span>
        <span className={styles.root__separator}>&bull;</span>
        <span className={styles.root__createdAt}>{formattedCreatedAt}</span>
      </div>
      <span className={styles.root__comment}>{comment.comment}</span>
      <div className={styles.root__footer}>
        <VoteButton
          action={VoteAction.upvote}
          onClick={handleCommentUpvote}
          isActive={comment.userPrincipalUpvoted}
          size={16}
        />
        <span className={styles.root__votes}>{comment.votes}</span>
        <AlternateLoader
          isLoading={isUpvoteMutateLoading || isDownvoteMutateLoading}
        />
        <VoteButton
          action={VoteAction.downvote}
          onClick={handleCommentDownvote}
          isActive={comment.userPrincipalDownvoted}
          size={16}
        />
      </div>
    </div>
  );
};
