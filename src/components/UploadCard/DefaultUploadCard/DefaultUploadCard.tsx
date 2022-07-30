import React from 'react';
import { flushSync } from 'react-dom';

import { useLocation } from 'wouter';

import { LinkUpload, FileUpload } from '@/components';
import { IUploadContext, UploadContext } from '@/context';
import styles from './DefaultUploadCard.module.scss';

export const DefaultUploadCard = () => {
  const [location, setLocation] = useLocation();

  const { setUrl, setFile, setFileBytes } = React.useContext(
    UploadContext,
  ) as IUploadContext;

  const handleImageFileUplaod = (
    file: File,
    imageArrayBuffer: Uint8Array,
  ): void => {
    flushSync(() => {
      setFile(file);
      setFileBytes(imageArrayBuffer);
      setUrl('');
      setLocation('/upload/preview');
    });
  };

  const handleLinkUpload = (url: string) => {
    flushSync(() => {
      setUrl(url);
      setFile(null);
      setLocation('/upload/preview');
    });
  };

  return (
    <div className={styles.root}>
      <FileUpload onUpload={handleImageFileUplaod} />
      <span className={styles.root__alternativeBinder}>or</span>
      <LinkUpload onUpload={handleLinkUpload} />
    </div>
  );
};
