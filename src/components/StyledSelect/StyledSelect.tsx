import { Field, FieldAttributes } from 'formik';

import styles from './StyledSelect.module.scss';

type Option = {
  id: string | number;
  value: any;
};

type StyledCheckboxProps = FieldAttributes<any> & {
  error?: string;
  touched?: boolean;
  value?: string;
  options: Option[];
};

// eslint-disable-next-line n/handle-callback-err
export const StyledSelect = ({
  error,
  touched,
  value,
  options,
  ...props
}: StyledCheckboxProps) => {
  return (
    <Field {...props} type="select" as="select" className={styles.root}>
      {options?.map((option: Option) => (
        <option
          className={styles.root__selectOption}
          value={option.value}
          key={option.id}
        >
          {option.id}
        </option>
      ))}
    </Field>
  );
};
