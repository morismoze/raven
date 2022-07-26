import { ChangeEvent, FormEvent } from 'react';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { StyledField } from '@/components';
import styles from './LinkUpload.module.scss';
import { axiosInstance } from '@/lib';

const LinkUploadSchema = Yup.object().shape({
  url: Yup.string()
    .matches(
      /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif))/i,
      'Image URL is not valid',
    )
    .required('Image URL is required'),
});

export interface LinkUploadValues {
  url: string;
}

interface LinkUploadProps {
  onLinkUpload: (url: string) => void;
}

export const LinkUpload = ({ onLinkUpload }: LinkUploadProps) => {
  const initialValues: LinkUploadValues = {
    url: '',
  };

  const handleOnSubmit = (values: LinkUploadValues): void => {
    // do nothing
  };

  const handleOnChange = async (event: FormEvent) => {
    const url = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (url) {
      try {
        const response = await axiosInstance.head(url);
        if (response.headers['content-type'].match('image/*')) {
          onLinkUpload(url);
        }
      } catch (error: any) {}
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LinkUploadSchema}
      onSubmit={handleOnSubmit}
    >
      {({ errors, touched, values }) => (
        <Form className={styles.root} onChange={handleOnChange}>
          <StyledField
            name="url"
            type="text"
            placeholder="Type or paste image URL"
            error={errors.url}
            touched={touched.url}
            value={values.url}
          />
        </Form>
      )}
    </Formik>
  );
};
