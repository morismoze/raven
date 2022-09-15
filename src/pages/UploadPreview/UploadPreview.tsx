import React, { useState } from 'react';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'wouter';

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
        retry: false,
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
        onError: (err) => {
          const responseError = err.response?.data as PostUploadResponseDto;
          if (responseError.message) {
            toast.error(responseError.message, {
              style: {
                fontSize: 13,
                color: 'var(--bg-main)',
              },
              iconTheme: {
                primary: 'var(--error)',
                secondary: '#FFFAEE',
              },
            });
          } else if (responseError.fieldErrors.length > 0) {
            setFieldErrors(
              (err.response?.data as PostUploadResponseDto).fieldErrors,
            );
          }
        },
      },
    );

  const { mutate: postFileMutate, isLoading: isPostFileMutateLoading } =
    useMutation<PostUploadResponseDto, AxiosError, PostFileUploadRequestDto>(
      (data) => uploadPostByImageFile(data),
      {
        retry: false,
        onSuccess: (data) => {
          redirectToNewPost(data.data);
        },
        onError: (err) => {
          const responseError = err.response?.data as PostUploadResponseDto;
          if (responseError.message) {
            toast.error(responseError.message, {
              style: {
                fontSize: 13,
                color: 'var(--bg-main)',
              },
              iconTheme: {
                primary: 'var(--error)',
                secondary: '#FFFAEE',
              },
            });
          } else if (responseError.fieldErrors.length > 0) {
            const fileFieldError = responseError.fieldErrors.find(
              (fieldError: FieldError) => fieldError.field === 'file',
            );

            if (fileFieldError) {
              toast.error(fileFieldError.error, {
                style: {
                  fontSize: 13,
                  color: 'var(--bg-main)',
                },
                iconTheme: {
                  primary: 'var(--error)',
                  secondary: '#FFFAEE',
                },
              });
            } else {
              setFieldErrors(
                (err.response?.data as PostUploadResponseDto).fieldErrors,
              );
            }
          }
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
