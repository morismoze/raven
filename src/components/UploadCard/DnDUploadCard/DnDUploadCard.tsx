import React from 'react';

import Dropzone from 'react-dropzone';
import { useLocation } from 'wouter';
import toast from 'react-hot-toast';

import { IUploadContext, UploadContext } from '@/context';
import { WRONG_TYPE_FILE } from '@/constants/uploadErrorConstants';
import styles from './DnDUploadCard.module.scss';

export const DnDUploadCard = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const { setUrl, setFile } = React.useContext(UploadContext) as IUploadContext;

  const acceptTypes = {
    'image/': ['.jpeg', '.png', '.gif', '.apng', '.tiff', '.avif'],
  };

  const handleOnDrop = async (fileArray: File[]) => {
    if (fileArray.length === 0) {
      toast.error(WRONG_TYPE_FILE, {
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
      setUrl('');
      const file = fileArray[0];
      setFile(file);
      setLocation('/upload/preview');
    }
  };

  return (
    <Dropzone accept={acceptTypes} onDrop={handleOnDrop} maxFiles={1}>
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
