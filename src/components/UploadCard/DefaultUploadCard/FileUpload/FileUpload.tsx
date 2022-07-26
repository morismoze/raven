import { ChangeEvent } from 'react';

import { FileImage } from 'react-bootstrap-icons';

import styles from './FileUpload.module.scss';

export const FileUpload = () => {
  const handleImageUpload = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    console.log(file);
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
