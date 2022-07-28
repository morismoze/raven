import { Header, HeaderLayout, UploadCard } from '@/components';
import styles from './Upload.module.scss';

export const Upload = (): JSX.Element => {
  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <UploadCard />
      </HeaderLayout>
    </>
  );
};
