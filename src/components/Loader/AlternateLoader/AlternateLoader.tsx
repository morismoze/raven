import styles from './AlternateLoader.module.scss';

interface IAlternateLoaderProps {
  isLoading: boolean;
  size?: number;
}

export const AlternateLoader = ({
  isLoading,
  size = 22,
}: IAlternateLoaderProps): JSX.Element | null => {
  if (!isLoading) {
    return null;
  }

  return <span className={styles.root} style={{ width: size, height: size }} />;
};
