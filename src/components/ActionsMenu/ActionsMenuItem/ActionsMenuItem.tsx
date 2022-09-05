import styles from './ActionsMenuItem.module.scss';

interface IActionsMenuItemProps {
  Icon: React.ElementType;
  text: string;
  onClick: () => void;
}

export const ActionsMenuItem = ({
  Icon,
  text,
  onClick,
}: IActionsMenuItemProps) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <div className={styles.root} onClick={handleOnClick}>
      <Icon className={styles.root__icon} />
      <span className={styles.root__text}>{text}</span>
    </div>
  );
};
