import { ChangeEvent, useState } from 'react';

import { FileImage } from 'react-bootstrap-icons';

import styles from './FileUpload.module.scss';

interface IFileUploadProps {
  onUpload: (file: File) => void;
}

export const FileUpload = ({ onUpload }: IFileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: ChangeEvent): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    if (!file.type.match('image/*')) {
      setError('Only image file types are allowed');
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
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.root__input}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </>
  );
};
