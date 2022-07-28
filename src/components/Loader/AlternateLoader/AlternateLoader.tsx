import styles from './AlternateLoader.module.scss';

interface IAlternateLoaderProps {
  isLoading: boolean;
}

export const AlternateLoader = ({
  isLoading,
}: IAlternateLoaderProps): JSX.Element | null => {
  if (!isLoading) {
    return null;
  }

  return <span className={styles.root} />;
};
