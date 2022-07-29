import classNames from 'classnames';

import styles from './Chip.module.scss';

export enum ChipAction {
  primary = 'primary',
  secondary = 'secondary',
}

interface IChipProps {
  text: string;
  Icon?: React.ElementType;
  onClick: () => void;
  action: ChipAction;
}

export const Chip = ({
  text,
  Icon,
  onClick,
  action,
}: IChipProps): JSX.Element => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <div
      className={classNames(styles.root, styles[action])}
      onClick={handleOnClick}
    >
      {Icon && <Icon className={styles.root__icon} />}
      <span className={styles.root__text}>{text}</span>
    </div>
  );
};
