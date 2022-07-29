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
      {options?.map((option: Option, index: number) => (
        <option
          className={styles.root__selectOption}
          value={option.value}
          key={index}
        >
          {option.id}
        </option>
      ))}
    </Field>
  );
};
