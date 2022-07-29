import { Field, FieldAttributes } from 'formik';
import { Check } from 'react-bootstrap-icons';

import styles from './StyledField.module.scss';

type StyledFieldProps = FieldAttributes<any> & {
  error?: string;
  touched?: boolean;
  value?: string;
};

export const StyledField = ({
  error,
  touched,
  value,
  ...props
}: StyledFieldProps) => {
  const { type } = props;

  const isError =
    type === 'password' || type === 'email' || type === 'url'
      ? (error && value) || (error && !value && touched)
      : error && touched;

  return (
    <div className={styles.root}>
      <Field {...props} className={styles.root__field} />
      {isError && <span className={styles.root__error}>{error}</span>}
      {!error && value && <Check className={styles.root__success} />}
    </div>
  );
};
