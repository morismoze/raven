import styles from './Description.module.scss';

interface IDescriptionProps {
  children: React.ReactNode;
}

export const Description = ({ children }: IDescriptionProps): JSX.Element => {
  return <p className={styles.root}>{children}</p>;
};
