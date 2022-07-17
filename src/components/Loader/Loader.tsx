import { motion } from 'framer-motion';

import styles from './Loader.module.scss';

export const Loader = (): JSX.Element => {
  return (
    <motion.div
      className={styles.root}
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.root__loader}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            <div key={index} />
          ))}
      </div>
    </motion.div>
  );
};
