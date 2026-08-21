"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

/** Optimized local/remote images via Next.js (AVIF/WebP, responsive sizes, lazy load). */
export function SmartImage({
  src,
  alt,
  className,
  priority = false,
  fill,
  width,
  height,
  sizes,
  style,
}: Props) {
  const url = src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;
  const shared = {
    src: url,
    alt,
    className,
    style,
    priority,
    decoding: "async" as const,
    quality: 85,
  };

  if (fill) {
    return <Image {...shared} fill sizes={sizes ?? "100vw"} />;
  }

  return (
    <Image
      {...shared}
      width={width ?? 800}
      height={height ?? 800}
      sizes={sizes}
      loading={priority ? undefined : "lazy"}
    />
  );
}
