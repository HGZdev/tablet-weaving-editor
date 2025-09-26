import { useEffect, useState } from "react";

const useOverflowDetection = (ref: React.RefObject<HTMLElement>): boolean => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const { scrollWidth, clientWidth } = ref.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return isOverflowing;
};

export default useOverflowDetection;
