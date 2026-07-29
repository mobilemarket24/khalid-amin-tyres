const NETLIFY_IMAGE_ENDPOINT = "/.netlify/images";

function canOptimize(src: string) {
  return Boolean(src) && !import.meta.env.DEV;
}

export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality = 76,
) {
  if (!canOptimize(src)) return src;

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality),
    fm: "webp",
  });

  return `${NETLIFY_IMAGE_ENDPOINT}?${params.toString()}`;
}

export function getOptimizedImageSrcSet(
  src: string,
  widths: number[],
  quality = 76,
) {
  if (!canOptimize(src)) return undefined;

  return widths
    .map((width) => `${getOptimizedImageUrl(src, width, quality)} ${width}w`)
    .join(", ");
}
