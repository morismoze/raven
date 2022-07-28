import React from 'react';

import {
  Header,
  HeaderLayout,
  UploadForm,
  UploadPreviewImage,
} from '@/components';
import { IUploadContext, UploadContext } from '@/context';
import styles from './UploadPreview.module.scss';

export const UploadPreview = (): JSX.Element => {
  const { file, bytes, url } = React.useContext(
    UploadContext,
  ) as IUploadContext;

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <UploadPreviewImage file={file} url={url} />
        <UploadForm />
      </HeaderLayout>
    </>
  );
};
