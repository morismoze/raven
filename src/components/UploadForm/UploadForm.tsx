import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBarUp } from 'react-bootstrap-icons';

import { StyledField, Button, ButtonSize, ButtonAction } from '@/components';
import styles from './UploadForm.module.scss';

const UploadSchema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Title must be at most 30 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(2200, 'Description must be at most 2200 characters')
    .required('Description is required'),
  mature: Yup.boolean(),
});

export interface IUploadPreviewValues {
  title: string;
  description: string;
  mature: boolean;
}

export const UploadForm = (): JSX.Element => {
  const initialValues: IUploadPreviewValues = {
    title: '',
    description: '',
    mature: false,
  };

  const handleOnSubmit = (values: IUploadPreviewValues) => {
    console.log(values);
  };

  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={UploadSchema}
        validateOnChange
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, values, setFieldError }) => (
          <Form className={styles.root__form}>
            <StyledField
              name="title"
              type="text"
              placeholder="Title"
              error={errors.title}
              touched={touched.title}
              value={values.title}
            />
            <StyledField
              name="description"
              type="text"
              placeholder="Description"
              error={errors.description}
              touched={touched.description}
              value={values.description}
              as="textarea"
              rows={5}
            />
            <StyledField
              name="mature"
              label="Is mature content?"
              type="checkbox"
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              Icon={ArrowBarUp}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
