import styles from './Tag.module.scss';

interface ITagProps {
  id: number;
  name: string;
  onClick: (tagId: number) => void;
}

export const Tag = ({ id, name, onClick }: ITagProps): JSX.Element => {
  return (
    <div onClick={() => onClick(id)} className={styles.root}>
      <span className={styles.root__tag}>{name}</span>
    </div>
  );
};
