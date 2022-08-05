import { Field, FieldAttributes } from 'formik';
import { Check } from 'react-bootstrap-icons';

import styles from './StyledField.module.scss';

type StyledFieldProps = FieldAttributes<any> & {
  error?: string;
  touched?: boolean;
  value?: string;
  showSuccessIcon?: boolean;
};

export const StyledField = ({
  error,
  touched,
  value,
  showSuccessIcon = true,
  ...props
}: StyledFieldProps): JSX.Element => {
  const { type } = props;

  const isError =
    type === 'password' || type === 'email' || type === 'url'
      ? (error && value) || (error && !value && touched)
      : error && touched;

  return (
    <div className={styles.root}>
      <Field {...props} className={styles.root__field} />
      {isError && <span className={styles.root__error}>{error}</span>}
      {showSuccessIcon && !error && value && (
        <Check className={styles.root__success} />
      )}
    </div>
  );
};
