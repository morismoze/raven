import classNames from 'classnames';
import styles from './ActionsMenuItem.module.scss';

interface IActionsMenuItemProps {
  Icon: React.ElementType;
  text: string;
  onClick: () => void;
  className?: string;
}

export const ActionsMenuItem = ({
  Icon,
  text,
  onClick,
  className,
}: IActionsMenuItemProps) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <div className={classNames(styles.root, className)} onClick={handleOnClick}>
      <Icon className={styles.root__icon} />
      <span className={styles.root__text}>{text}</span>
    </div>
  );
};
