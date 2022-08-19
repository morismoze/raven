import { useLocation } from 'wouter';
import { PlusSquareFill } from 'react-bootstrap-icons';

import { Button, ButtonAction } from '@/components';
import styles from './EmptyPostsData.module.scss';

export const EmptyPostsData = () => {
  const [, setLocation] = useLocation();

  const handleAddNewPost = () => {
    setLocation('/upload');
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__noPostsContainer}>
        <span className={styles.root__noPostsText}>
          There seems to be no posts in here.
        </span>
        <span className={styles.root__noPostsText}>
          Be the first and create one!
        </span>
      </div>
      <Button
        action={ButtonAction.primary}
        onClick={handleAddNewPost}
        Icon={PlusSquareFill}
      >
        New Post
      </Button>
    </div>
  );
};
