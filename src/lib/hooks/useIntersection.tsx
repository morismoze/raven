import { RefObject, useEffect } from 'react';

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

const handleIntersections = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target)) {
      const cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
};

const getIntersectionObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(handleIntersections, {
      threshold: 0.15,
    });
  }

  return observer;
};

export const useIntersection = (
  elem: RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    if (elem.current) {
      const target = elem.current;
      const observer = getIntersectionObserver();

      listenerCallbacks.set(target, callback);
      observer.observe(target);

      return () => {
        listenerCallbacks.delete(target);
        observer.unobserve(target);
      };
    }
  }, [elem.current]);
};
