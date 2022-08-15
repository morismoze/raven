import { Tag } from '@/api';
import classNames from 'classnames';
import styles from './TagSelectOption.module.scss';

interface ITagSelectOption {
  tag: Tag;
  onClick: (tag: Tag) => void;
  isSelected: boolean;
}

export const TagSelectOption = ({
  onClick,
  tag,
  isSelected,
}: ITagSelectOption): JSX.Element => {
  const handleOnClick = () => {
    onClick(tag);
  };

  return (
    <div
      className={classNames(styles.root, {
        [styles['root--active']]: isSelected,
      })}
      onClick={handleOnClick}
    >
      <span className={styles.root__tag}>{tag.tagDisplayName}</span>
    </div>
  );
};
