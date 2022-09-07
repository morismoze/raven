import { Image } from '@/components';
import styles from './Cover.module.scss';

interface ICoverProps {
  url?: string;
  blurhash?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export const Cover = ({
  url,
  blurhash,
  width,
  height,
  alt,
}: ICoverProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <Image
        src={url}
        blurhash={blurhash}
        width={width}
        height={height}
        alt={alt}
        className={styles.root__img}
      />
    </div>
  );
};
