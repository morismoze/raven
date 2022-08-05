import FadeIn from 'react-fade-in';

import { DefaultUploadCard, DnDUploadCard } from '@/components';
import styles from './UploadCard.module.scss';

export const UploadCard = (): JSX.Element => {
  return (
    <FadeIn className={styles.root}>
      <div className={styles.root__wrapper}>
        <DnDUploadCard />
        <DefaultUploadCard />
      </div>
    </FadeIn>
  );
};
