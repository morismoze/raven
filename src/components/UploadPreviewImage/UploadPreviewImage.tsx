import { useEffect } from 'react';

import { useLocation } from 'wouter';

import styles from './UploadPreviewImage.module.scss';

interface IUploadPreviewImageProps {
  file: File | null;
  url: string | null;
}

export const UploadPreviewImage = ({
  file,
  url,
}: IUploadPreviewImageProps): JSX.Element | null => {
  const [location, setLocation] = useLocation();

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
  return <img src={url || undefined} id="preview" className={styles.root} />;
};
