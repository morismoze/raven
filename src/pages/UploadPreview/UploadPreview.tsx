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
  NewPostId,
  PostFileUploadRequestDto,
  PostUploadResponseDto,
  PostUrlUploadRequestDto,
  uploadPostByImageFile,
  uploadPostByImageUrl,
} from '@/api';
import styles from './UploadPreview.module.scss';
import { useLocation } from 'wouter';

export const UploadPreview = (): JSX.Element => {
  const [location, setLocation] = useLocation();

  const { data: tags } = useQuery<AllTagsResponseDto>(
    'fetch-all-tags',
    fetchAllTags,
    {
      refetchOnMount: true,
    },
  );

  const { mutate: postUrlMutate, isLoading: isPostUrlMutateLoading } =
    useMutation<PostUploadResponseDto, unknown, PostUrlUploadRequestDto>(
      (data) => uploadPostByImageUrl(data),
      {
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
      },
    );

  const { mutate: postFileMutate, isLoading: isPostFileMutateLoading } =
    useMutation<PostUploadResponseDto, unknown, PostFileUploadRequestDto>(
      (data) => uploadPostByImageFile(data),
      {
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
      },
    );

  const { file, url } = React.useContext(UploadContext) as IUploadContext;

  const handleUpload = async (values: IUploadFormValues) => {
    const { title, description, tags, mature } = values;

    if (!file) {
      postUrlMutate({ url, title, description, tags, mature });
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file!);
      formData.append('tags', JSON.stringify(tags));
      formData.append('mature', JSON.stringify(mature));
      postFileMutate(formData);
    }
  };

  const redirectToNewPost = (id: NewPostId) => {
    setLocation(`/p/${id}`);
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
