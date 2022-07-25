import Dropzone from 'react-dropzone';
import { FileImage } from 'react-bootstrap-icons';

import styles from './UploadDnD.module.scss';

export const UploadDnD = () => {
  const acceptTypes = {
    accept: ['.png', '.gif', '.jpeg', '.jpg'],
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__basicUploadContainer}>
        <FileImage className={styles.root__imageIcon} />
        <span className={styles.root__chooseText}>Choose an image</span>
      </div>
      <span className={styles.root__alternativeBinder}>or</span>
      <Dropzone accept={acceptTypes}>
        {({ getRootProps, getInputProps }) => (
          <div className={styles.root__dropUploadContainer}>
            <span className={styles.root__dropText}>Drop an image here</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
