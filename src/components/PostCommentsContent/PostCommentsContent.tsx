import { useMutation, useQueryClient } from 'react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import {
  CommentForm,
  ICommentFormValues,
  AuthToComment,
  CommentsHeader,
  Comment,
  Button,
  ButtonAction,
  ButtonSize,
  AlternateLoader,
} from '@/components';
import {
  PostComment,
  PostCommentRequestDto,
  PostCommentsResponseDto,
  uploadPostComment,
  useAuth,
  User,
} from '@/api';
import styles from './PostCommentsContent.module.scss';

interface IPostCommentsContentProps {
  postId?: string;
  commentsGroups?: PostCommentsResponseDto[];
  hasMoreComments?: boolean;
  totalCommentsCount?: number;
  commentsRef?: React.RefObject<HTMLDivElement>;
  onLoadMoreComments: () => void;
  isMoreCommentsRefetching: boolean;
  refetchPage: (pageToRefetch: number) => void;
}

export const PostCommentsContent = ({
  postId,
  commentsGroups,
  hasMoreComments,
  totalCommentsCount,
  commentsRef,
  onLoadMoreComments,
  isMoreCommentsRefetching,
  refetchPage,
}: IPostCommentsContentProps): JSX.Element => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { mutate, isLoading } = useMutation<
    unknown,
    unknown,
    PostCommentRequestDto
  >((data) => uploadPostComment(postId || '', data), {
    onSuccess: () => {
      console.log('wut');

      queryClient.invalidateQueries('fetch-post-comments');
    },
  });

  const [parent] = useAutoAnimate();

  const userPrincipal = user?.data as User;

  const handleOnSubmit = (values: ICommentFormValues) => {
    mutate(values);
  };

  return (
    <div className={styles.root}>
      {userPrincipal ? (
        <CommentForm onSubmit={handleOnSubmit} isSubmitting={isLoading} />
      ) : (
        <AuthToComment />
      )}
      <CommentsHeader
        commentsCount={totalCommentsCount}
        commentsRef={commentsRef}
      />
      <div
        ref={parent as React.RefObject<HTMLDivElement>}
        className={styles.root__componentsContainer}
      >
        {commentsGroups?.map((group: PostCommentsResponseDto, groupIndex) => {
          return group.data.comments.map((comment: PostComment, index) => (
            <Comment
              postId={postId!}
              comment={comment}
              commentPage={groupIndex}
              refetchPage={refetchPage}
              key={index}
            />
          ));
        })}
      </div>
      {hasMoreComments && (
        <Button
          size={ButtonSize.small}
          action={ButtonAction.primary}
          onClick={onLoadMoreComments}
          disabled={isMoreCommentsRefetching}
          className={styles.root__morePostCommentsButton}
        >
          <div className={styles.root__buttonContainer}>
            <span>Load more comments</span>
            <AlternateLoader isLoading={isMoreCommentsRefetching} />
          </div>
        </Button>
      )}
    </div>
  );
};
