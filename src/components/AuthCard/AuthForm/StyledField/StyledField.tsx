import { Field, FieldAttributes } from 'formik';

import styles from './StyledField.module.scss';

interface StyledFieldProps extends FieldAttributes<any> {
  error: string | undefined;
  touched: boolean | undefined;
}

export const StyledField = ({ error, touched, ...props }: StyledFieldProps) => {
  return (
    <>
      <Field {...props} className={styles.root} />
      {error && touched ? <div>{error}</div> : null}
    </>
  );
};
