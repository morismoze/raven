import { Header, HeaderLayout, UploadCard } from '@/components';
import styles from './Upload.module.scss';

export const Upload = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Header />
      <HeaderLayout className={styles.root__contentContainer}>
        <UploadCard />
      </HeaderLayout>
    </div>
  );
};
