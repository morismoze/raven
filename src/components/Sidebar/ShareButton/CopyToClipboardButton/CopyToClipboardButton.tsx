import { Link45deg } from 'react-bootstrap-icons';

import toast from 'react-hot-toast';

import styles from './CopyToClipboardButton.module.scss';

export const CopyToClipboardButton = () => {
  const handleOnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Post URL copied to clipboard!', {
      style: {
        fontSize: 13,
        color: 'var(--bg-main)',
      },
      iconTheme: {
        primary: 'var(--success)',
        secondary: '#FFFAEE',
      },
    });
  };

  return (
    <div className={styles.root}>
      <Link45deg
        className={styles.root__icon}
        onClick={handleOnClick}
        size={25}
      />
    </div>
  );
};
