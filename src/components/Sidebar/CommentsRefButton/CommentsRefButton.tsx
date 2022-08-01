import { ReactComponent as Comments } from '@/assets/icons/comments.svg';

import styles from './CommentsRefButton.module.scss';

interface ICommentsRefButtonProps {
  commentsSectionRef: React.MutableRefObject<HTMLDivElement | undefined>;
  comments?: number;
}

export const CommentsRefButton = ({
  commentsSectionRef,
  comments,
}: ICommentsRefButtonProps): JSX.Element => {
  const handleOnClick = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div onClick={handleOnClick} className={styles.root}>
      <Comments className={styles.root__icon} />
      <span className={styles.root__count}>{comments}</span>
    </div>
  );
};
