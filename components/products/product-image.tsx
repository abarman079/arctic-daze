"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProductImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export function ProductImage({
  src,
  fallbackSrc = "/editorial/community.png",
  alt,
  ...props
}: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc(fallbackSrc)}
    />
  );
}