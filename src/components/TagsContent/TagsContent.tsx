import { SectionTitle, Tag, ShowMoreTags } from '@/components';
import { Tag as TTag } from '@/api';
import styles from './TagsContent.module.scss';
import { useState } from 'react';
import { useLocation } from 'wouter';
import classNames from 'classnames';

interface ITagsContentProps {
  tags?: TTag[];
}

export const TagsContent = ({ tags }: ITagsContentProps): JSX.Element => {
  const [, setLocation] = useLocation();

  const [isMoreTagsActive, setIsMoreTagsActive] = useState<boolean>(false);

  const toggleTags = () => {
    setIsMoreTagsActive(!isMoreTagsActive);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <SectionTitle>Explore tags</SectionTitle>
        <ShowMoreTags active={isMoreTagsActive} onClick={toggleTags} />
      </div>
      <div
        className={classNames(styles.root__tagsContainer, {
          [styles['root__tagsContainer--active']]: isMoreTagsActive,
        })}
      >
        {tags?.map((tag: TTag, index) => (
          <Tag name={tag.tagName} key={index} />
        ))}
      </div>
    </div>
  );
};
