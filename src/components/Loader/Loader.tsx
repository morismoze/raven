import styles from './Loader.module.scss';

export const Loader = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.root__loader}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            <div key={index} />
          ))}
      </div>
    </div>
  );
};
