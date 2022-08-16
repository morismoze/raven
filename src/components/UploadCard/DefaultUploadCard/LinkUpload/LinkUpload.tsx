import { FormEvent } from 'react';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { StyledField } from '@/components';
import styles from './LinkUpload.module.scss';
import { axiosInstance } from '@/lib';

const LinkUploadSchema = Yup.object().shape({
  url: Yup.string().required('Image URL is required'),
});

export interface ILinkUploadValues {
  url: string;
}

interface ILinkUploadProps {
  onUpload: (url: string) => void;
}

type FormikSetFieldErrorFn = (
  field: string,
  message: string | undefined,
) => void;

export const LinkUpload = ({ onUpload }: ILinkUploadProps) => {
  const initialValues: ILinkUploadValues = {
    url: '',
  };

  const handleOnSubmit = (values: ILinkUploadValues): void => {
    // do nothing
  };

  const handleOnChange = async (
    event: FormEvent,
    setFieldError: FormikSetFieldErrorFn,
  ) => {
    const url = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (url) {
      try {
        const response = await axiosInstance.head(url);
        console.log(response);

        if (
          !response.headers['content-type'].match('image/*') &&
          response.status !== 200
        ) {
          setFieldError('url', 'Given image URL is not valid');
        } else {
          onUpload(url);
        }
      } catch (error: any) {
        setFieldError('url', 'Given image URL is not valid');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LinkUploadSchema}
      validateOnChange
      onSubmit={handleOnSubmit}
    >
      {({ errors, touched, values, setFieldError }) => {
        return (
          <Form
            className={styles.root}
            onChange={(event: FormEvent) =>
              handleOnChange(event, setFieldError)
            }
          >
            <StyledField
              name="url"
              type="url"
              placeholder="Type or paste image URL"
              error={errors.url}
              touched={touched.url}
              value={values.url}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
