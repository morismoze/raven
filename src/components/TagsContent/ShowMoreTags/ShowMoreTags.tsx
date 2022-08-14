import { SectionTitle } from '@/components';
import styles from './ShowMoreTags.module.scss';

interface IShowMoreTagsProps {
  active: boolean;
  onClick: () => void;
}

export const ShowMoreTags = ({ active, onClick }: IShowMoreTagsProps) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <SectionTitle>{active ? 'Less tags -' : 'More tags +'}</SectionTitle>
    </div>
  );
};
