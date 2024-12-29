export const iOSPreset = {
  r1: 0.0586,
  r2: 0.332,
} as const;

export const DEFAULT_RATIO = iOSPreset.r1 / iOSPreset.r2;

export function getSquirclePath(
  w: number,
  h: number,
  r1: number,
  r2: number
): string {
  const padding = 2;
  r1 = Math.min(r1, r2);
  w += padding * 2;
  h += padding * 2;

  return `
    M ${-padding},${r2}
    C ${-padding},${r1} ${r1},${-padding} ${r2},${-padding}
    L ${w - r2},${-padding}
    C ${w - r1},${-padding} ${w},${r1} ${w},${r2}
    L ${w},${h - r2}
    C ${w},${h - r1} ${w - r1},${h} ${w - r2},${h}
    L ${r2},${h}
    C ${r1},${h} ${-padding},${h - r1} ${-padding},${h - r2}
    L ${-padding},${r2}
  `
    .trim()
    .replace(/\n/g, " ");
}

export function getSquirclePathAsDataUri(
  w: number,
  h: number,
  r1: number,
  r2: number
): string {
  const path = getSquirclePath(w, h, r1, r2);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <path fill="none" stroke="red" stroke-width="1" d="${path}" />
    </svg>`;
  return convertSvgToDataUri(svg);
}

function convertSvgToDataUri(data: string): string {
  return (
    "data:image/svg+xml," +
    data
      .replace(/"/g, "'")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)
  );
}
