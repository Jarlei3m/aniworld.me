import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CarouselSlideContext } from '../contexts/CarouselSlide/CarouselSlideContext';

const useSize = () => {
  const { handleWindowResize } = useContext(CarouselSlideContext);
  // const [currentWidth, setCurrentWidth] = useState(null);
  let observer = useRef(null);

  const getWidth = (elements: any) => {
    const el = elements[0].target;

    if (!el) return;

    let elWidth = el.offsetWidth ?? 0;

    handleWindowResize(elWidth, 20);
  };

  const sizeRef = useCallback((node) => {
    if (node) {
      observer.current = new ResizeObserver(getWidth).observe(node);
      // handleWindowResize(node.getBoundingClientRect().width, 20);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return [sizeRef];
};

export default useSize;
