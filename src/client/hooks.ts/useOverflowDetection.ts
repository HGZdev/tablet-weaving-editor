import {useEffect, useState, RefObject} from "react";
import {debounce} from "lodash";
import useMutationObserver from "./useMutationObserver";

const useOverflowDetection = (
  ref: RefObject<HTMLElement>,
  debounceDelay = 200
) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = debounce(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, debounceDelay);

  useEffect(() => {
    checkOverflow();

    const handleResize = () => {
      checkOverflow();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      checkOverflow.cancel();
    };
  }, [ref, checkOverflow]);

  useMutationObserver(ref, checkOverflow, {
    childList: true,
    subtree: true,
  });

  return isOverflowing;
};

export default useOverflowDetection;
