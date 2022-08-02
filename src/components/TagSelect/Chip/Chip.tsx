import FadeIn from 'react-fade-in';
import { X } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './Chip.module.scss';

export enum ChipAction {
  primary = 'primary',
  secondary = 'secondary',
}

interface IChipProps {
  text: string;
  Icon?: React.ElementType;
  onClick?: () => void;
  action: ChipAction;
  onRemove?: () => void;
}

export const Chip = ({
  text,
  Icon,
  onClick,
  action,
  onRemove,
}: IChipProps): JSX.Element => {
  return (
    <div className={classNames(styles.root, styles[action])} onClick={onClick}>
      {Icon && <Icon className={styles.root__icon} />}
      <span className={styles.root__text}>{text}</span>
      {onRemove && (
        <div className={styles.root__removeContainer}>
          <FadeIn>
            <X className={styles.root__removeicon} />
          </FadeIn>
        </div>
      )}
    </div>
  );
};
