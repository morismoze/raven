import toast from 'react-hot-toast';

import { ReactComponent as Star } from '@/assets/icons/favorite.svg';
import { useAuth, User } from '@/api';
import styles from './FavorizeButton.module.scss';

interface IFavorizeButtonProps {
  onClick: () => void;
}

export const FavorizeButton = ({
  onClick,
}: IFavorizeButtonProps): JSX.Element => {
  const { user } = useAuth();

  const userPrincipal = user?.data as User;

  const handleOnClick = () => {
    if (!userPrincipal) {
      toast.error('You have to be logged in order to favorize', {
        style: {
          fontSize: 13,
          color: 'var(--bg-main)',
        },
        iconTheme: {
          primary: 'var(--error)',
          secondary: '#FFFAEE',
        },
      });
    } else {
      onClick();
    }
  };

  return <Star onClick={handleOnClick} className={styles.root} />;
};
