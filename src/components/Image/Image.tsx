import { useRef, useState } from 'react';

import { useIntersection } from '@/lib';
import styles from './Image.module.scss';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = (props: ImageProps): JSX.Element | null => {
  const [isInView, setIsInView] = useState<boolean>(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  useIntersection(imgContainerRef, () => {
    console.log(props.src);
    setIsInView(true);
  });

  return (
    <div ref={imgContainerRef} className={styles.root}>
      {isInView && <img {...props} loading="lazy" />}
    </div>
  );
};
