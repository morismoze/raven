import { useState } from 'react';
import styles from './ActionsMenu.module.scss';

export const ActionsMenu = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={styles.menuButton} onClick={handleToggleMenu}>
        {Array(3)
          .fill('')
          .map((_, index) => (
            <span className={styles.menuButton__point} key={index} />
          ))}
      </div>
      {isActive && <div className={styles.menu}></div>}
    </>
  );
};
