import { SectionTitle, Tag } from '@/components';
import { Tag as TTag } from '@/api';
import styles from './TagsContent.module.scss';

interface ITagsContentProps {
  tags?: TTag[];
  onSelect: (tagId: number) => void;
}

export const TagsContent = ({ tags, onSelect }: ITagsContentProps) => {
  const handleOnTagClick = (tagId: number) => {
    // do nothing
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <SectionTitle>Explore tags</SectionTitle>
      </div>
      <div className={styles.root__tagsContainer}>
        {tags?.map((tag: TTag, index) => (
          <Tag
            id={tag.id}
            name={tag.tagName}
            onClick={handleOnTagClick}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
