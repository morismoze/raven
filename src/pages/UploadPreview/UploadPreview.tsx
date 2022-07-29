import React from 'react';

import { useQuery } from 'react-query';

import {
  Header,
  HeaderLayout,
  IUploadFormValues,
  UploadForm,
  UploadPreviewImage,
} from '@/components';
import { IUploadContext, UploadContext } from '@/context';
import { AllTagsResponseDto, fetchAllTags } from '@/api';
import styles from './UploadPreview.module.scss';

export const UploadPreview = (): JSX.Element => {
  const { data: tags } = useQuery<AllTagsResponseDto>(
    'fetch-all-tags',
    fetchAllTags,
  );

  const { file, bytes, url } = React.useContext(
    UploadContext,
  ) as IUploadContext;

  const handleUpload = (values: IUploadFormValues) => {};

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <UploadPreviewImage file={file} url={url} />
        <UploadForm onSubmit={handleUpload} tags={tags?.data} />
      </HeaderLayout>
    </>
  );
};
