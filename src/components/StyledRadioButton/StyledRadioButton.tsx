import classNames from 'classnames';
import { Field, FieldAttributes } from 'formik';

import styles from './StyledRadioButton.module.scss';

type StyledCheckboxProps = FieldAttributes<any> & {
  error?: string;
  touched?: boolean;
  showSuccessIcon?: boolean;
};

// eslint-disable-next-line n/handle-callback-err
export const StyledRadioButton = ({
  error,
  touched,
  showSuccessIcon = true,
  ...props
}: StyledCheckboxProps): JSX.Element => {
  const { label } = props;

  const isError = error && touched;

  return (
    <div className={styles.root}>
      <label className={styles.root__label}>
        <Field
          {...props}
          type="radio"
          className={classNames(styles.root__field, styles.root__checkbox)}
        />
        {label}
      </label>
      {isError && <span className={styles.root__error}>{error}</span>}
    </div>
  );
};
