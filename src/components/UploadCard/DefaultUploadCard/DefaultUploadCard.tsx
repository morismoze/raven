import { ChangeEvent } from 'react';

import * as Yup from 'yup';

import { LinkUpload, FileUpload } from '@/components';
import styles from './DefaultUploadCard.module.scss';

const DefaultUploadSchema = Yup.object().shape({
  image: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'URL is not of valid type',
    )
    .required('Image link is required'),
});

export const DefaultUploadCard = () => {
  const handleImageUpload = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    console.log(file);
  };

  const handleLinkUpload = (url: string) => {
    // send to API
  };

  return (
    <div className={styles.root}>
      <FileUpload />
      <span className={styles.root__alternativeBinder}>or</span>
      <LinkUpload onLinkUpload={handleLinkUpload} />
    </div>
  );
};
