"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

/** Native img from /public — same absolute path on localhost and Vercel. */
export function SmartImage({ src, alt, className, priority, fill, width, height }: Props) {
  const url = src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;
  return (
    <img
      src={url}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
