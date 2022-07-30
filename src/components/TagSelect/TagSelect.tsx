import { useEffect, useState } from 'react';

import { Field, FormikErrors, FormikTouched } from 'formik';
import { PlusCircleDotted } from 'react-bootstrap-icons';

import { Chip, TagSelectDropdown, ChipAction } from '@/components';
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
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

  const [selectableTags, setSelectableTabs] = useState<Tag[]>([]);

  const handleToggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleOnTagOptionClick = (
    value: Tag[],
    setFieldValue: any,
    tag: Tag,
  ) => {
    handleToggleDropdown();
    setFieldValue(name, [...value, tag]);
    const newSelectableTags = selectableTags.filter(
      (selectableTag: Tag) => selectableTag.id !== tag.id,
    );
    setSelectableTabs(newSelectableTags);
  };

  const handleOnTagClick = (value: Tag[], setFieldValue: any, tag: Tag) => {
    const newValue = value.filter((valueTag: Tag) => valueTag.id !== tag.id);
    setFieldValue(name, newValue);
    setSelectableTabs([...selectableTags, tag]);
  };

  useEffect(() => {
    setSelectableTabs(tags);
  }, [tags]);

  return (
    <>
      <Field name={name} error={error} touched={touched}>
        {({ field: { value }, form: { setFieldValue } }: FieldRenderProps) => (
          <div className={styles.root}>
            <div className={styles.root__dropdownContainer}>
              <Chip
                Icon={PlusCircleDotted}
                text="Tag"
                onClick={handleToggleDropdown}
                action={ChipAction.primary}
              />
              <TagSelectDropdown
                active={isDropdownActive}
                tags={selectableTags}
                onTagClick={(tag: Tag) =>
                  handleOnTagOptionClick(value, setFieldValue, tag)
                }
              />
            </div>
            {value.map((selectedTag: Tag) => (
              <Chip
                text={selectedTag.tagName}
                onClick={() =>
                  handleOnTagClick(value, setFieldValue, selectedTag)
                }
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
