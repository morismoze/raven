import { useState } from 'react';

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { Modal, CopyToClipboardButton } from '@/components';
import { ReactComponent as Share } from '@/assets/icons/share.svg';
import styles from './ShareButton.module.scss';

export const ShareButton = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentUrl = window.location.href;

  const handleOnShareButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Share onClick={handleOnShareButtonClick} className={styles.root} />
      <Modal
        active={isModalOpen}
        setIsActive={setIsModalOpen}
        title="Share post"
      >
        <div className={styles.share}>
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon className={styles.share__icon} />
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon className={styles.share__icon} />
          </TwitterShareButton>
          <EmailShareButton url={currentUrl}>
            <EmailIcon className={styles.share__icon} />
          </EmailShareButton>
          <CopyToClipboardButton />
        </div>
      </Modal>
    </>
  );
};
