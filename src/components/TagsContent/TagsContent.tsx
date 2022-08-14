import { useState } from 'react';

import classNames from 'classnames';

import { SectionTitle, Tag, ShowMoreTags } from '@/components';
import { TagPost } from '@/api';
import styles from './TagsContent.module.scss';

interface ITagsContentProps {
  tags?: TagPost[];
}

export const TagsContent = ({ tags }: ITagsContentProps): JSX.Element => {
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
        {tags?.map((tag: TagPost, index) => (
          <Tag name={tag.tagName} postsCount={tag.posts} key={index} />
        ))}
      </div>
    </div>
  );
};
