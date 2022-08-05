import styles from './CommentsHeader.module.scss';

interface ICommentsHeaderProps {
  commentsCount?: number;
  commentsRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const CommentsHeader = ({
  commentsCount,
  commentsRef,
}: ICommentsHeaderProps): JSX.Element => {
  return (
    <div ref={commentsRef} className={styles.root}>
      <span className={styles.root__title}>{commentsCount} COMMENTS</span>
    </div>
  );
};
