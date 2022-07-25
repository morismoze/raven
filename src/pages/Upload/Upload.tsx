import { Header, HeaderLayout, UploadDnD } from '@/components';
import styles from './Upload.module.scss';

export const Upload = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Header />
      <HeaderLayout className={styles.root__contentContainer}>
        <UploadDnD />
      </HeaderLayout>
    </div>
  );
};
