import { useEffect, useState } from 'react';

import { Field, FormikErrors, FormikTouched } from 'formik';
import { PlusCircle } from 'react-bootstrap-icons';

import { Chip, TagSelectModal, ChipAction } from '@/components';
import { Tag } from '@/api';
import styles from './TagSelect.module.scss';

interface ITagSelectProps {
  name: string;
  error: string | string[] | FormikErrors<Tag>[] | undefined;
  touched: FormikTouched<Tag>[] | undefined;
  tags: Tag[];
}

type FieldRenderProps = {
  field: { value: Tag[] };
  form: any;
};

export const TagSelect = ({
  name,
  tags,
  error,
  touched,
}: ITagSelectProps): JSX.Element => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const handleOnTagsSelect = (setFieldValue: any, tags: Tag[]) => {
    handleToggleModal();
    setFieldValue(name, tags);
  };

  return (
    <>
      <Field name={name} error={error} touched={touched}>
        {({ field: { value }, form: { setFieldValue } }: FieldRenderProps) => (
          <div className={styles.root}>
            <Chip
              Icon={PlusCircle}
              text="Tag"
              onClick={handleToggleModal}
              action={ChipAction.primary}
            />
            <TagSelectModal
              active={isModalActive}
              toggleActive={handleToggleModal}
              tags={tags}
              onTagsSelect={(tags: Tag[]) =>
                handleOnTagsSelect(setFieldValue, tags)
              }
              value={value}
            />
            {value.map((selectedTag: Tag) => (
              <Chip
                text={selectedTag.tagDisplayName}
                action={ChipAction.secondary}
                key={selectedTag.id}
              />
            ))}
          </div>
        )}
      </Field>
      <span className={styles.errorMessage}>
        {touched && error && (error as string)}
      </span>
    </>
  );
};
