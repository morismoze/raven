import { X } from 'react-bootstrap-icons';
import FadeIn from 'react-fade-in';

import { Button, ButtonAction, ButtonSize } from '@/components';
import { useDisableBodyScroll } from '@/lib';
import styles from './Modal.module.scss';

interface IModalProps {
  active: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children?: React.ReactNode;
  submitButtonName?: string;
  onSubmit?: () => void;
  onClose?: () => void;
}

export const Modal = ({
  active,
  setIsActive,
  title,
  children,
  submitButtonName,
  onSubmit,
  onClose,
}: IModalProps): JSX.Element | null => {
  const handleOnClose = () => {
    onClose?.();
    setIsActive(false);
  };

  const handleOnSubmit = () => {
    onSubmit?.();
  };

  useDisableBodyScroll(active);

  if (!active) {
    return null;
  }

  return (
    <div className={styles.root}>
      <FadeIn delay={350} className={styles.root__fadeWrapper}>
        <div className={styles.root__modal}>
          <div className={styles.root__header}>
            <span className={styles.root__title}>{title}</span>
            <X className={styles.root__close} onClick={handleOnClose} />
          </div>
          <div className={styles.root__body}>{children}</div>
          {onSubmit && (
            <div className={styles.root__footer}>
              <Button
                onClick={handleOnSubmit}
                size={ButtonSize.small}
                action={ButtonAction.primary}
              >
                {submitButtonName}
              </Button>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};
