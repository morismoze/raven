import { ReactComponent as Share } from '@/assets/icons/share.svg';

import styles from './ShareButton.module.scss';

interface IShareButtonProps {
  onClick: () => void;
}

export const ShareButton = ({ onClick }: IShareButtonProps): JSX.Element => {
  const handleOnClick = () => {
    onClick();
  };

  return <Share onClick={handleOnClick} className={styles.root} />;
};
