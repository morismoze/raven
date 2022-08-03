import { useMutation } from 'react-query';

import { CommentForm, ICommentFormValues, AuthToComment } from '@/components';
import {
  PostCommentRequestDto,
  PostComments,
  uploadPostComment,
  useAuth,
  User,
} from '@/api';
import { queryClient } from '@/lib';
import styles from './PostCommentsContent.module.scss';

interface IPostCommentsContentProps {
  postId?: string;
  comments?: PostComments;
}

export const PostCommentsContent = ({
  postId,
  comments,
}: IPostCommentsContentProps): JSX.Element => {
  const { user } = useAuth();

  const { mutate, isLoading } = useMutation<
    unknown,
    unknown,
    PostCommentRequestDto
  >((data) => uploadPostComment(postId || '', data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fetch-post-comments');
    },
  });

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
    </div>
  );
};
