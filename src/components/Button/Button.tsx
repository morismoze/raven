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
}: ButtonProps): JSX.Element => {
  console.log(size);
  console.log(action);

  return (
    <div className={classNames(styles.root, styles[size], styles[action])}>
      <button onClick={onClick} className={styles.root__button}>
        {Icon && <Icon className={styles.root__icon} />}
        <span className={styles.root__text}>{text}</span>
      </button>
    </div>
  );
};
