import { Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import { ArrowBarUp } from 'react-bootstrap-icons';

import {
  StyledField,
  Button,
  ButtonAction,
  ButtonSize,
  AlternateLoader,
  CharacterCount,
} from '@/components';
import { INPUT_CHARACTER_LIMITS } from '@/constants';
import styles from './CommentForm.module.scss';

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .max(
      INPUT_CHARACTER_LIMITS.POST_COMMENT,
      `Comment must be at most ${INPUT_CHARACTER_LIMITS.POST_COMMENT} characters`,
    )
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
              maxLength={INPUT_CHARACTER_LIMITS.POST_COMMENT}
            />
            <div className={styles.root__footer}>
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
              <CharacterCount
                maxCharactes={INPUT_CHARACTER_LIMITS.POST_COMMENT}
                characters={values.comment.length}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
