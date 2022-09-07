import { useEffect } from 'react';

export const useDisableBodyScroll = (active: boolean) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '10px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    }
  }, [active]);
};
