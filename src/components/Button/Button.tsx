import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonSize {
  small = 'small',
  large = 'large',
}

export enum ButtonAction {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps {
  onClick: () => void;
  size: ButtonSize;
  text: string;
  Icon?: React.ElementType;
  action: ButtonAction;
}

export const Button = ({
  onClick,
  size = ButtonSize.small,
  text,
  Icon,
  action = ButtonAction.secondary,
}: ButtonProps) => {
  console.log(size);
  console.log(action);

  return (
    <button
      onClick={onClick}
      className={classNames(styles.root, styles[size], styles[action])}>
      {Icon && <Icon className={styles.root__icon} />}
      <span className={styles.root__text}>{text}</span>
    </button>
  );
};
