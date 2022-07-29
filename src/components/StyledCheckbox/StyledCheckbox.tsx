import classNames from 'classnames';
import { Field, FieldAttributes } from 'formik';

import styles from './StyledCheckbox.module.scss';

type StyledCheckboxProps = FieldAttributes<any> & {
  error?: string;
  touched?: boolean;
  value?: string;
};

// eslint-disable-next-line n/handle-callback-err
export const StyledCheckbox = ({
  error,
  touched,
  value,
  ...props
}: StyledCheckboxProps) => {
  const { label } = props;

  return (
    <label className={styles.root}>
      <Field
        {...props}
        className={classNames(styles.root__field, styles.root__checkbox)}
      />
      {label}
    </label>
  );
};
