import { useEffect, useState } from 'react';

import { useLocation } from 'wouter';
import { AlternateLoader } from '@/components';

import styles from './UploadPreviewImage.module.scss';
import classNames from 'classnames';

interface IUploadPreviewImageProps {
  file: File | null;
  url: string | null;
}

export const UploadPreviewImage = ({
  file,
  url,
}: IUploadPreviewImageProps): JSX.Element | null => {
  const [, setLocation] = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  if (!file && !url) {
    setLocation('/upload');
    return null;
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      const image = document.getElementById('preview');
      reader.onload = (event) => {
        (image as HTMLImageElement)!.src = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }, []);

  // upload by url
  return (
    <>
      <AlternateLoader isLoading={isLoading} size={32} />
      <img
        src={url || undefined}
        onLoad={handleOnLoad}
        id="preview"
        className={classNames(styles.root, { [styles.loaded]: !isLoading })}
      />
    </>
  );
};
