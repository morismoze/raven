import { useCallback, useEffect, useRef, useState } from 'react';

import FadeIn from 'react-fade-in';

import styles from './ActionsMenu.module.scss';

interface IActionsMenuProps {
  children: React.ReactNode;
}

export const ActionsMenu = ({ children }: IActionsMenuProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const menuButtonRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleOnClickOutside = useCallback((event: MouseEvent) => {
    if (
      isActive &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleOnClickOutside);
    };
  }, [menuButtonRef]);

  return (
    <FadeIn>
      <div className={styles.root}>
        <div
          ref={menuButtonRef}
          className={styles.root__menuButton}
          onClick={handleToggleMenu}
        >
          {Array(3)
            .fill('')
            .map((_, index) => (
              <span className={styles.root__menuButtonPoint} key={index} />
            ))}
        </div>
        {isActive && <div className={styles.root__menu}>{children}</div>}
      </div>
    </FadeIn>
  );
};
