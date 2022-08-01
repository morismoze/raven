import { ReactComponent as Star } from '@/assets/icons/favorite.svg';

import styles from './FavorizeButton.module.scss';

interface IFavorizeButtonProps {
  onClick: () => void;
}

export const FavorizeButton = ({
  onClick,
}: IFavorizeButtonProps): JSX.Element => {
  const handleOnClick = () => {
    onClick();
  };

  return <Star onClick={handleOnClick} className={styles.root} />;
};
