import styles from './Cover.module.scss';

interface ICoverProps {
  url?: string;
  alt?: string;
}

export const Cover = ({ url, alt }: ICoverProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <img src={url} alt={alt} className={styles.root__img} />
    </div>
  );
};
