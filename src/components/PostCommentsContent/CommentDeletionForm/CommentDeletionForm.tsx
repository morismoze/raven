import {
  Button,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
} from '@/components';
import styles from './CommentDeletionForm.module.scss';

interface ICommentDeletionFormProps {
  onSubmit: () => void;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export const CommentDeletionForm = ({
  onSubmit,
  setIsActive,
  isLoading,
}: ICommentDeletionFormProps) => {
  const handleDiscardDeletion = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.root}>
      <span className={styles.root__text}>
        Are you sure you want to delete this comment?
        <br /> It cannot be undone.
      </span>
      <div className={styles.root__actionsContainer}>
        <Button
          size={ButtonSize.small}
          action={ButtonAction.secondary}
          onClick={handleDiscardDeletion}
          disabled={isLoading}
        >
          Keep comment
        </Button>
        <Button
          size={ButtonSize.small}
          action={ButtonAction.primary}
          onClick={onSubmit}
          disabled={isLoading}
        >
          <div className={styles.root__submitContainer}>
            <span>Delete comment</span>
            <AlternateLoader isLoading={isLoading} />
          </div>
        </Button>
      </div>
    </div>
  );
};
