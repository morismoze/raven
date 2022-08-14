import { useState } from 'react';

import FadeIn from 'react-fade-in';

import {
  TagSelectOption,
  Button,
  ButtonSize,
  ButtonAction,
} from '@/components';
import { Tag } from '@/api';
import styles from './TagSelectModal.module.scss';

interface ITagSelectModalProps {
  active: boolean;
  toggleActive: () => void;
  tags: Tag[];
  onTagsSelect: (tags: Tag[]) => void;
}

export const TagSelectModal = ({
  active,
  toggleActive,
  tags,
  onTagsSelect,
}: ITagSelectModalProps): JSX.Element | null => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  if (!active) {
    return null;
  }

  const handleOnTagClick = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const filtered = selectedTags.filter(
        (selectedTag: Tag) => selectedTag.id !== tag.id,
      );
      setSelectedTags(filtered);
    }
  };

  const handleOnSelectTags = () => {
    toggleActive();
    onTagsSelect(selectedTags);
  };

  const handleOnCloseModal = () => {
    toggleActive();
  };

  return (
    <FadeIn className={styles.root}>
      <div className={styles.root__tagsContainer}>
        {tags.map((tag: Tag) => (
          <TagSelectOption
            tag={tag}
            onClick={handleOnTagClick}
            isSelected={selectedTags.includes(tag)}
            key={tag.id}
          />
        ))}
      </div>
      <div className={styles.root__buttonsContainer}>
        <Button
          onClick={handleOnSelectTags}
          size={ButtonSize.small}
          action={ButtonAction.primary}
        >
          Continue with selected tags
        </Button>
        <Button
          onClick={handleOnCloseModal}
          size={ButtonSize.small}
          action={ButtonAction.secondary}
        >
          Close
        </Button>
      </div>
    </FadeIn>
  );
};
