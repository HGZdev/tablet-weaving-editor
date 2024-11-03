import {useEffect, RefObject} from "react";

type MutationObserverCallback = (
  mutations: MutationRecord[],
  observer: MutationObserver
) => void;

type MutationObserverOptions = {
  attributes?: boolean;
  characterData?: boolean;
  childList?: boolean;
  subtree?: boolean;
};

const useMutationObserver = (
  ref: RefObject<HTMLElement>,
  callback: MutationObserverCallback,
  options: MutationObserverOptions = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [ref, callback, options]);
};

export default useMutationObserver;
