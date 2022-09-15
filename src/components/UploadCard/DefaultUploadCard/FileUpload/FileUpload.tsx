import { ChangeEvent } from 'react';

import { FileImage } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

import { WRONG_TYPE_FILE } from '@/constants/uploadErrorConstants';
import styles from './FileUpload.module.scss';

interface IFileUploadProps {
  onUpload: (file: File) => void;
}

export const FileUpload = ({ onUpload }: IFileUploadProps) => {
  const handleImageUpload = async (event: ChangeEvent): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    if (!file.type.match('image/(jpeg|png|gif|apng|tiff)')) {
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
      onUpload(file);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <label htmlFor="image-input" className={styles.root__labelContainer}>
          <FileImage className={styles.root__imageIcon} />
          <span className={styles.root__chooseText}>Choose an image</span>
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/jpeg, image/png, image/gif, image/apng, image/tiff"
          onChange={handleImageUpload}
          className={styles.root__input}
        />
      </div>
    </>
  );
};
