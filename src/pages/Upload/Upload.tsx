import { Helmet } from 'react-helmet-async';

import { Header, HeaderLayout, UploadCard } from '@/components';
import styles from './Upload.module.scss';

export const Upload = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Raven &bull; Upload</title>
      </Helmet>
      <Header />
      <HeaderLayout className={styles.root}>
        <UploadCard />
      </HeaderLayout>
    </>
  );
};
