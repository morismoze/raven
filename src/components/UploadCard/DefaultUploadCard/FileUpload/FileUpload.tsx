import { ChangeEvent } from 'react';

import { FileImage } from 'react-bootstrap-icons';

import { convertFileToBytes } from '@/utils';
import styles from './FileUpload.module.scss';

interface IFileUploadProps {
  onUpload: (file: File, base64Image: Uint8Array) => void;
}

export const FileUpload = ({ onUpload }: IFileUploadProps) => {
  const handleImageUpload = async (event: ChangeEvent): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const uint8 = await convertFileToBytes(file);
    onUpload(file, uint8);
  };

  return (
    <div className={styles.root}>
      <label htmlFor="image-input" className={styles.root__labelContainer}>
        <FileImage className={styles.root__imageIcon} />
        <span className={styles.root__chooseText}>Choose an image</span>
      </label>
      <input
        id="image-input"
        type="file"
        accept="image/png,image/gif,image/jpeg,image/webp"
        onChange={handleImageUpload}
        className={styles.root__input}
      />
    </div>
  );
};
