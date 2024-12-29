import { useEffect, useCallback, RefObject } from "react";

export function useObserveResize<T extends Element | null>(
  ref: RefObject<T>,
  callback: (entry: ResizeObserverEntry) => void
): void {
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callback(entries[0]);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
