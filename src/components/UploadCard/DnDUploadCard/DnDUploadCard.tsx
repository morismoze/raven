import React from 'react';

import Dropzone from 'react-dropzone';
import { useLocation } from 'wouter';

import { IUploadContext, UploadContext } from '@/context';
import styles from './DnDUploadCard.module.scss';

export const DnDUploadCard = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const { setUrl, setFile } = React.useContext(UploadContext) as IUploadContext;

  const acceptTypes = {
    'image/*': ['.jpeg', '.gif', '.png', '.webp'],
  };

  const handleDrop = async (fileArray: File[]) => {
    if (fileArray.length === 1) {
      setUrl('');
      const file = fileArray[0];
      setFile(file);
      setLocation('/upload/preview');
    }
  };

  return (
    <Dropzone accept={acceptTypes} onDrop={handleDrop} maxFiles={1}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={styles.root}>
          <div className={styles.root__dropZone}>
            <input {...getInputProps()} />
            <span className={styles.root__dropText}>Drop an image here</span>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
