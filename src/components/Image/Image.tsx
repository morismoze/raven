import { useRef, useState } from 'react';

import { Blurhash } from 'react-blurhash';
import classNames from 'classnames';

import { useIntersection } from '@/lib';
import styles from './Image.module.scss';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  blurhash?: string;
  errorClassName?: string;
};

const LOADING_ERROR =
  'The requested image does not exist or is no longer available.';

export const Image = ({
  blurhash,
  errorClassName,
  ...props
}: ImageProps): JSX.Element | null => {
  const [isInView, setIsInView] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { width, height, onLoad } = props;

  useIntersection(imgContainerRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleOnError = () => {
    setError(LOADING_ERROR);
  };

  return (
    <div ref={imgContainerRef} className={styles.root}>
      <Blurhash
        hash={blurhash!}
        punch={1}
        className={classNames(styles.root__blurhash, {
          [styles.root__isRemoved]: isLoaded || error,
        })}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      />
      {isInView &&
        (!error ? (
          <img {...props} onLoad={handleOnLoad} onError={handleOnError} />
        ) : (
          <span className={classNames(styles.root__error, errorClassName)}>
            {error}
          </span>
        ))}
    </div>
  );
};
