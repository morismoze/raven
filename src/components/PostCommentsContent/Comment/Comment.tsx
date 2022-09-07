import { useState } from 'react';

import { Flag, Pencil } from 'react-bootstrap-icons';
import { useMutation } from 'react-query';

import {
  Avatar,
  VoteButton,
  VoteAction,
  AlternateLoader,
  ActionsMenu,
  ActionsMenuItem,
  Modal,
  CommentReportForm,
} from '@/components';
import {
  downvotePostComment,
  PostCommentVoteResponseDto,
  PostComment,
  upvotePostComment,
  useAuth,
  User,
  PostCommentReportReason,
} from '@/api';
import { formatCreatedAt } from '@/utils';
import styles from './Comment.module.scss';

interface ICommentProps {
  postId: string;
  comment: PostComment;
  commentReportReasons?: PostCommentReportReason[];
  commentPage: number;
  refetchPage: (pageToRefetch: number) => void;
}

export const Comment = ({
  postId,
  comment,
  commentReportReasons,
  commentPage,
  refetchPage,
}: ICommentProps): JSX.Element => {
  const [isCommentReportActive, setIsCommentReportActive] =
    useState<boolean>(false);

  const { user } = useAuth();

  const { mutate: upvoteMutate, isLoading: isUpvoteMutateLoading } =
    useMutation<PostCommentVoteResponseDto, unknown>(
      'upvote-post-comment',
      () => upvotePostComment(postId, comment.id),
      {
        onSuccess: () => {
          refetchPage(commentPage);
        },
      },
    );

  const { mutate: downvoteMutate, isLoading: isDownvoteMutateLoading } =
    useMutation<PostCommentVoteResponseDto, unknown>(
      'downvote-post-comment',
      () => downvotePostComment(postId, comment.id),
      {
        onSuccess: () => {
          refetchPage(commentPage);
        },
      },
    );

  const userPrincipal = user?.data as User;

  const handleCommentUpvote = () => {
    upvoteMutate();
  };

  const handleCommentDownvote = () => {
    downvoteMutate();
  };

  const handleCommentReportClick = () => {
    setIsCommentReportActive(true);
  };

  const handleCommentReportSubmit = () => {};

  const handleEditComment = () => {};

  const formattedCreatedAt = formatCreatedAt(comment.createdAt);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.root__wrapper}>
          <div className={styles.root__header}>
            <div className={styles.root__metadataContainer}>
              <Avatar
                id={comment.userId}
                username={comment.username}
                size={25}
              />
              <span className={styles.root__username}>{comment.username}</span>
              <span className={styles.root__separator}>&bull;</span>
              <span className={styles.root__createdAt}>
                {formattedCreatedAt}
              </span>
            </div>
            <div className={styles.root__actionsMenuWrapper}>
              <ActionsMenu key={comment.id}>
                <ActionsMenuItem
                  Icon={Flag}
                  text="Report comment"
                  onClick={handleCommentReportClick}
                />
                {userPrincipal && userPrincipal.id === comment.userId && (
                  <ActionsMenuItem
                    Icon={Pencil}
                    text="Edit comment"
                    onClick={handleEditComment}
                  />
                )}
              </ActionsMenu>
            </div>
          </div>
          <pre className={styles.root__comment}>{comment.comment}</pre>
          <div className={styles.root__footer}>
            <VoteButton
              action={VoteAction.upvote}
              onClick={handleCommentUpvote}
              isActive={comment.userPrincipalUpvoted}
              size={16}
            />
            {!isUpvoteMutateLoading && !isDownvoteMutateLoading && (
              <span className={styles.root__votes}>{comment.votes}</span>
            )}
            <AlternateLoader
              isLoading={isUpvoteMutateLoading || isDownvoteMutateLoading}
              size={14}
            />
            <VoteButton
              action={VoteAction.downvote}
              onClick={handleCommentDownvote}
              isActive={comment.userPrincipalDownvoted}
              size={16}
            />
          </div>
        </div>
      </div>
      <Modal
        active={isCommentReportActive}
        setIsActive={setIsCommentReportActive}
        title="Report comment"
        submitButtonName="Report"
      >
        <CommentReportForm
          commentReportReasons={commentReportReasons}
          onSubmit={handleCommentReportSubmit}
          isUploading={false}
        />
      </Modal>
    </>
  );
};
