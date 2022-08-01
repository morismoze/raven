import styles from './Title.module.scss';

interface ITitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: ITitleProps) => {
  return <span className={styles.root}>{children}</span>;
};
