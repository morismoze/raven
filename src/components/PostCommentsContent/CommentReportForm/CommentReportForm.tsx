import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
  StyledField,
  Button,
  ButtonSize,
  ButtonAction,
  StyledRadioButton,
  AlternateLoader,
  TextLink,
} from '@/components';
import { PostCommentReportReason } from '@/api';
import { INPUT_CHARACTER_LIMITS } from '@/constants';
import styles from './CommentReportForm.module.scss';

const UploadSchema = Yup.object().shape({
  reason: Yup.string().required('Reason is required'),
  description: Yup.string()
    .max(
      INPUT_CHARACTER_LIMITS.POST_COMMENT_REPORT_DESCRIPTION,
      `Description must be at most ${INPUT_CHARACTER_LIMITS.POST_COMMENT_REPORT_DESCRIPTION} characters`,
    )
    .trim()
    .required('Description is required'),
});

export interface ICommentReportFormValues {
  reason: string;
  description: string;
}

export interface ICommentReportFormProps {
  commentReportReasons?: PostCommentReportReason[];
  onSubmit: (values: ICommentReportFormValues) => void;
  isUploading: boolean;
}

export const CommentReportForm = ({
  commentReportReasons,
  onSubmit,
  isUploading,
}: ICommentReportFormProps): JSX.Element => {
  const initialValues: ICommentReportFormValues = {
    reason: '',
    description: '',
  };

  const handleOnSubmit = (values: ICommentReportFormValues) => {
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
            <div role="group" className={styles.root__radioGroup}>
              {commentReportReasons?.map((reason, index) => (
                <StyledRadioButton
                  name="reason"
                  label={reason.reasonValue}
                  error={errors.reason}
                  touched={touched.reason}
                  value={reason.reasonValue}
                  key={index}
                />
              ))}
              <StyledField
                name="description"
                type="text"
                placeholder="Please describe the issue. This comment will be reported to our moderation team."
                error={errors.description}
                touched={touched.description}
                value={values.description}
                as="textarea"
                showSuccessIcon={false}
                maxLength={
                  INPUT_CHARACTER_LIMITS.POST_COMMENT_REPORT_DESCRIPTION + 1
                }
              />
            </div>
            <div className={styles.root__footer}>
              <span className={styles.root__rules}>
                For more info please read our{' '}
                <TextLink href="/community-rules">Community rules</TextLink>
              </span>
              <Button
                size={ButtonSize.small}
                action={ButtonAction.primary}
                type="submit"
                disabled={isUploading}
              >
                <div className={styles.root__submitContainer}>
                  <span>Report</span>
                  <AlternateLoader isLoading={isUploading} />
                </div>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
