import FadeIn from 'react-fade-in';

import { TagSelectOption } from '@/components';
import { Tag } from '@/api';
import styles from './TagSelectDropdown.module.scss';

interface ITagSelectDropdown {
  active: boolean;
  tags: Tag[];
  onTagClick: (tag: Tag) => void;
}

export const TagSelectDropdown = ({
  active,
  tags,
  onTagClick,
}: ITagSelectDropdown): JSX.Element | null => {
  if (!active) {
    return null;
  }

  return (
    <FadeIn className={styles.root}>
      <div className={styles.root__wrapper}>
        {tags.length > 0 ? (
          <>
            {tags.map((tag: Tag) => (
              <TagSelectOption tag={tag} onClick={onTagClick} key={tag.id} />
            ))}
          </>
        ) : (
          <span className={styles.root__emptyTags}>
            No more tags left to choose
          </span>
        )}
      </div>
    </FadeIn>
  );
};
