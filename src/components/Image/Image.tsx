import { useRef, useState } from 'react';

import { Blurhash } from 'react-blurhash';
import classNames from 'classnames';

import styles from './Image.module.scss';
import { useIntersection } from '@/lib';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  blurhash?: string;
};

export const Image = ({
  blurhash,
  ...props
}: ImageProps): JSX.Element | null => {
  const [isInView, setIsInView] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { width, height, onLoad } = props;

  useIntersection(imgContainerRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  return (
    <div ref={imgContainerRef} className={styles.root}>
      <Blurhash
        hash={blurhash!}
        punch={1}
        className={classNames(styles.root__blurhash, {
          [styles.root__isLoaded]: isLoaded,
        })}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      />
      {isInView && <img {...props} loading="lazy" onLoad={handleOnLoad} />}
    </div>
  );
};
