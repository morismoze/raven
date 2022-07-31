import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBarUp } from 'react-bootstrap-icons';

import {
  StyledField,
  Button,
  ButtonSize,
  ButtonAction,
  StyledCheckbox,
  TagSelect,
  AlternateLoader,
} from '@/components';
import styles from './UploadForm.module.scss';
import { Tag } from '@/api';

const UploadSchema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Title must be at most 30 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(2200, 'Description must be at most 2200 characters')
    .required('Description is required'),
  tags: Yup.array()
    .min(1, 'Atleast one tag must be selected')
    .required('Tag is required'),
  mature: Yup.boolean(),
});

export interface IUploadFormValues {
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
}

export interface IUploadFormProps {
  onSubmit: (values: IUploadFormValues) => void;
  tags?: Tag[];
  isLoading: boolean;
}

export const UploadForm = ({
  onSubmit,
  tags,
  isLoading,
}: IUploadFormProps): JSX.Element => {
  const initialValues: IUploadFormValues = {
    title: '',
    description: '',
    tags: [],
    mature: false,
  };

  const handleOnSubmit = (values: IUploadFormValues) => {
    onSubmit(values);
  };

  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={UploadSchema}
        validateOnChange
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, values }) => (
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
            <TagSelect
              name="tags"
              error={errors.tags}
              touched={touched.tags}
              tags={tags || []}
            />
            <StyledCheckbox
              name="mature"
              label="Is mature content?"
              type="checkbox"
              error={errors.mature}
              touched={touched.mature}
              value={values.mature}
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              Icon={ArrowBarUp}
              disabled={isLoading}
            >
              <div className={styles.root__submitContainer}>
                <span>Submit post</span>
                <AlternateLoader isLoading={isLoading} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
