import { useEffect, useCallback, RefObject } from "react";

export function useObserveResize(
  ref: RefObject<Element>,
  callback: (entry: ResizeObserverEntry) => void
): void {
  useEffect(() => {
    if (!ref.current || !window.ResizeObserver) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (!ref.current) return;
      callback(entries[0]);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
