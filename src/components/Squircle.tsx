import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  JSX,
} from "react";
import { Size, SquircleProps, MaskStyleInput } from "../types";
import { DEFAULT_RATIO, getSquirclePathAsDataUri } from "../utils/squircle";
import { useObserveResize } from "../hooks/useObserveResize";
import { createMemoryCache } from "../utils/cache";

function getMaskStyle(input: MaskStyleInput): React.CSSProperties {
  const { width, height } = input;
  const maxBorderRadius = Math.min(width, height) / 2;
  const { radius = maxBorderRadius, ratio = DEFAULT_RATIO } = input;

  const numberRadius = typeof radius === "string" ? maxBorderRadius : radius;
  const finalBorderRadius = Math.min(numberRadius, maxBorderRadius);
  const dataUri = getSquirclePathAsDataUri(
    width,
    height,
    finalBorderRadius * ratio,
    finalBorderRadius
  );

  return {
    maskImage: `url("${dataUri}")`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url("${dataUri}")`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
  };
}

const cachedGetMaskStyle = createMemoryCache(
  getMaskStyle,
  (input: MaskStyleInput) => {
    const { width, height, radius, ratio } = input;
    return `${width}-${height}-${radius}-${ratio}`;
  }
);

export function Squircle({
  radius,
  ratio = DEFAULT_RATIO,
  className,
  children,
  style,
  ...htmlProps
}: SquircleProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResized = useCallback((entry: ResizeObserverEntry) => {
    const { width, height } = entry.contentRect;
    setSize((oldSize) => {
      if (width === oldSize.width && height === oldSize.height) {
        return oldSize;
      }
      return { width, height };
    });
  }, []);

  useObserveResize<HTMLDivElement | null>(ref, handleResized);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const { width, height } = rect;
    setSize({ width, height });
  }, []);

  const { width = 0, height = 0 } = size;

  return (
    <div
      className={className}
      {...htmlProps}
      ref={ref}
      style={{
        ...style,
        ...cachedGetMaskStyle({ width, height, radius, ratio }),
        maskPosition: "center",
        maskSize: "contain",
        maskRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
