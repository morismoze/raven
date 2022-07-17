import styles from './AlternateLoader.module.scss';

interface AlternateLoaderProps {
  isLoading: boolean;
}

export const AlternateLoader = ({
  isLoading,
}: AlternateLoaderProps): JSX.Element | null => {
  if (!isLoading) {
    return null;
  }

  return <span className={styles.root} />;
};
