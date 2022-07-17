import { Field, FieldAttributes } from 'formik';
import { Check } from 'react-bootstrap-icons';

import styles from './StyledField.module.scss';

type StyledFieldProps = FieldAttributes<any> & {
  error: string | undefined;
  touched: boolean | undefined;
  success: boolean | undefined;
};

export const StyledField = ({
  error,
  touched,
  success,
  ...props
}: StyledFieldProps) => {
  return (
    <div className={styles.root}>
      <Field {...props} className={styles.root__field} />
      {error && touched ? (
        <span className={styles.root__error}>{error}</span>
      ) : null}
      {success && <Check className={styles.root__noError} />}
    </div>
  );
};
