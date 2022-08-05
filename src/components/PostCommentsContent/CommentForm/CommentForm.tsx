import { Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import { ArrowBarUp } from 'react-bootstrap-icons';

import {
  StyledField,
  Button,
  ButtonAction,
  ButtonSize,
  AlternateLoader,
} from '@/components';
import styles from './CommentForm.module.scss';

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .max(2200, 'Comment must be at most 2200 characters')
    .required('Comment is required'),
});

export interface ICommentFormValues {
  comment: string;
}

interface ICommentEditorProps {
  onSubmit: (values: ICommentFormValues) => void;
  isSubmitting: boolean;
}

type ResetFormFn = (
  nextState?: Partial<FormikState<ICommentFormValues>> | undefined,
) => void;

export const CommentForm = ({
  onSubmit,
  isSubmitting,
}: ICommentEditorProps): JSX.Element => {
  const initialValues: ICommentFormValues = { comment: '' };

  const handleOnSubmit = (
    values: ICommentFormValues,
    resetForm: ResetFormFn,
  ) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={CommentSchema}
        validateOnChange
        onSubmit={(values, { resetForm }) => handleOnSubmit(values, resetForm)}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root__form}>
            <StyledField
              name="comment"
              type="text"
              placeholder="Comment"
              error={errors.comment}
              touched={touched.comment}
              value={values.comment}
              as="textarea"
              rows={5}
              showSuccessIcon={false}
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              Icon={ArrowBarUp}
              disabled={isSubmitting}
            >
              <div className={styles.root__submitContainer}>
                <span>Submit comment</span>
                <AlternateLoader isLoading={isSubmitting} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
