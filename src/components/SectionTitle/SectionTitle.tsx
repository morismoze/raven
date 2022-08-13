import styles from './SectionTitle.module.scss';

interface ISectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle = ({ children }: ISectionTitleProps) => {
  return <span className={styles.root}>{children}</span>;
};
