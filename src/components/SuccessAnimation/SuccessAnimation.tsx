import Lottie from 'react-lottie';

import success from '@/assets/lottie/success.json';
import styles from './SuccessAnimation.module.scss';

interface ISuccessAnimationProps {
  show: boolean;
  onAnimationFinish?: () => void;
}

export const SuccessAnimation = ({
  show,
  onAnimationFinish,
}: ISuccessAnimationProps): JSX.Element | null => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.root}>
      <Lottie
        options={defaultOptions}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => onAnimationFinish && onAnimationFinish(),
          },
        ]}
        height={300}
        width={300}
      />
    </div>
  );
};
