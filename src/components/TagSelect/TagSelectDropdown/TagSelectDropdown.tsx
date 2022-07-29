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
    <FadeIn>
      <div className={styles.root}>
        {tags.map((tag: Tag, index) => (
          <TagSelectOption tag={tag} onClick={onTagClick} key={index} />
        ))}
      </div>
    </FadeIn>
  );
};
