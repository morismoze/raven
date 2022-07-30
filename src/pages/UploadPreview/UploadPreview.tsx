import React from 'react';

import { useMutation, useQuery } from 'react-query';

import {
  Header,
  HeaderLayout,
  IUploadFormValues,
  UploadForm,
  UploadPreviewImage,
} from '@/components';
import { IUploadContext, UploadContext } from '@/context';
import {
  AllTagsResponseDto,
  fetchAllTags,
  PostFileUploadRequestDto,
  PostUrlUploadRequestDto,
  uploadPostByImageFile,
  uploadPostByImageUrl,
} from '@/api';
import styles from './UploadPreview.module.scss';

export const UploadPreview = (): JSX.Element => {
  const { data: tags } = useQuery<AllTagsResponseDto>(
    'fetch-all-tags',
    fetchAllTags,
    {
      refetchOnMount: true,
    },
  );

  const { mutate: postUrlMutate, isLoading: isPostUrlMutateLoading } =
    useMutation((data: PostUrlUploadRequestDto) => uploadPostByImageUrl(data));

  const { mutate: postFileMutate, isLoading: isPostFileMutateLoading } =
    useMutation((data: PostFileUploadRequestDto) =>
      uploadPostByImageFile(data),
    );

  const { file, fileBytes, url } = React.useContext(
    UploadContext,
  ) as IUploadContext;

  const handleUpload = async (values: IUploadFormValues) => {
    const { title, description, tags, mature } = values;

    if (!fileBytes) {
      postUrlMutate({ url, title, description, tags, mature });
    } else {
      postFileMutate({
        fileBytes: String(fileBytes),
        title,
        description,
        tags,
        mature,
      });
    }
  };

  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <UploadPreviewImage file={file} url={url} />
        <UploadForm
          onSubmit={handleUpload}
          tags={tags?.data}
          isLoading={isPostUrlMutateLoading || isPostFileMutateLoading}
        />
      </HeaderLayout>
    </>
  );
};
