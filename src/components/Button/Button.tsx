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

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  size?: ButtonSize;
  Icon?: React.ElementType;
  action: ButtonAction;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  onClick,
  size = ButtonSize.small,
  Icon,
  action = ButtonAction.secondary,
  className,
  children,
  ...rest
}: IButtonProps): JSX.Element => {
  const { disabled } = rest;

  return (
    <div
      className={classNames(
        styles.root,
        styles[size],
        styles[action],
        className,
        {
          [styles.disabled]: disabled,
        },
      )}
    >
      <button {...rest} onClick={onClick} className={styles.root__button}>
        {Icon && <Icon className={styles.root__icon} />}
        <span className={styles.root__text}>{children}</span>
      </button>
    </div>
  );
};
