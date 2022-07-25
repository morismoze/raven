import Dropzone from 'react-dropzone';

import styles from './DnDUploadCard.module.scss';

export const DnDUploadCard = () => {
  const acceptTypes = {
    'image/*': ['.jpeg', '.jpg', '.png'],
  };

  return (
    <Dropzone accept={acceptTypes}>
      {({ getRootProps, getInputProps }) => (
        <div className={styles.root}>
          <div className={styles.root__dropZone}>
            <span className={styles.root__dropText}>Drop an image here</span>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
