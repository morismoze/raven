import React, { useState } from 'react';

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
  FieldError,
  NewPostId,
  PostFileUploadRequestDto,
  PostUploadResponseDto,
  PostUrlUploadRequestDto,
  uploadPostByImageFile,
  uploadPostByImageUrl,
} from '@/api';
import styles from './UploadPreview.module.scss';
import { useLocation } from 'wouter';
import { AxiosError } from 'axios';

export const UploadPreview = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const [fieldErrors, setFieldErrors] = useState<FieldError[] | undefined>();

  const { data: tags } = useQuery<AllTagsResponseDto>(
    'fetch-all-tags',
    fetchAllTags,
    {
      refetchOnMount: true,
    },
  );

  const { mutate: postUrlMutate, isLoading: isPostUrlMutateLoading } =
    useMutation<PostUploadResponseDto, AxiosError, PostUrlUploadRequestDto>(
      (data) => uploadPostByImageUrl(data),
      {
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
        onError: (err) => {
          setFieldErrors(
            (err.response?.data as PostUploadResponseDto).fieldErrors,
          );
        },
      },
    );

  const { mutate: postFileMutate, isLoading: isPostFileMutateLoading } =
    useMutation<PostUploadResponseDto, AxiosError, PostFileUploadRequestDto>(
      (data) => uploadPostByImageFile(data),
      {
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
        onError: (err) => {
          setFieldErrors(
            (err.response?.data as PostUploadResponseDto).fieldErrors,
          );
        },
      },
    );

  const { file, url } = React.useContext(UploadContext) as IUploadContext;

  const handleUpload = (values: IUploadFormValues) => {
    const { title, description, tags, mature } = values;

    if (!file) {
      postUrlMutate({ url, title, description, tags, mature });
      if (fieldErrors) {
        return fieldErrors;
      }
    } else {
      console.log(file);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('tags', JSON.stringify(tags));
      formData.append('mature', JSON.stringify(mature));
      postFileMutate(formData);
    }

    return null;
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
          fieldErrors={fieldErrors}
          tags={tags?.data}
          isUploading={isPostUrlMutateLoading || isPostFileMutateLoading}
        />
      </HeaderLayout>
    </>
  );
};
