import { Tag } from '@/api';
import styles from './TagSelectOption.module.scss';

interface ITagSelectOption {
  tag: Tag;
  onClick: (tag: Tag) => void;
}

export const TagSelectOption = ({
  onClick,
  tag,
}: ITagSelectOption): JSX.Element => {
  const handleOnClick = () => {
    onClick(tag);
  };

  return (
    <div className={styles.root} onClick={handleOnClick}>
      <span className={styles.root__tag}>{tag.tagName}</span>
    </div>
  );
};
