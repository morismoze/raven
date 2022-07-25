import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FileImage } from 'react-bootstrap-icons';

import { StyledField } from '@/components';
import styles from './DefaultUploadCard.module.scss';
import { ChangeEvent } from 'react';

const DefaultUploadSchema = Yup.object().shape({
  image: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'URL is not of valid type',
    )
    .required('Image link is required'),
});

export interface DefaultUploadValues {
  image: string;
}

export const DefaultUploadCard = () => {
  const initialValues = {
    image: '',
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target as HTMLInputElement;
    console.log(input);

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log(file);
  };

  const handleLinkUpload = (values: DefaultUploadValues): void => {
    console.log(values);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__basicUploadContainer}>
        <label htmlFor="image-input" className={styles.root__labelContainer}>
          <FileImage className={styles.root__imageIcon} />
          <span className={styles.root__chooseText}>Choose an image</span>
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          onChange={handleImageUpload}
          className={styles.root__input}
        />
      </div>
      <span className={styles.root__alternativeBinder}>or</span>
      <Formik
        initialValues={initialValues}
        validationSchema={DefaultUploadSchema}
        onSubmit={handleLinkUpload}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root__form}>
            <StyledField
              name="image"
              type="text"
              placeholder="Type or paste image URL"
              error={errors.image}
              touched={touched.image}
              value={values.image}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
