"use client";

import Image from "next/image";
import { ImageMaskReveal } from "@/components/motion/image/ImageMaskReveal";
import { ImageParallax } from "@/components/motion/image/ImageParallax";
import { ImageReveal } from "@/components/motion/image/ImageReveal";
import { ImageScaleReveal } from "@/components/motion/image/ImageScaleReveal";
import { CLIP_PATHS } from "@/lib/motion/imagePresets";
import { MOTION_PARALLAX } from "@/lib/motion/tokens";

export type AnimatedImageVariant = "mask" | "scale" | "reveal" | "parallax";

interface AnimatedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  variant?: AnimatedImageVariant;
  maskDirection?: keyof typeof CLIP_PATHS;
  parallaxStrength?: number;
}

/** Scroll-driven image with mask / scale / parallax reveal */
export function AnimatedImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = "100vw",
  priority = false,
  className = "",
  imageClassName = "",
  objectPosition = "center center",
  variant = "scale",
  maskDirection = "up",
  parallaxStrength = MOTION_PARALLAX.normal,
}: AnimatedImageProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={`object-cover ${imageClassName}`}
      style={{ objectPosition }}
    />
  );

  const content = fill ? (
    <div className="relative h-full w-full">{image}</div>
  ) : (
    image
  );

  switch (variant) {
    case "mask":
      return (
        <ImageMaskReveal direction={maskDirection} className={`h-full w-full ${className}`}>
          {content}
        </ImageMaskReveal>
      );
    case "reveal":
      return (
        <ImageReveal className={`h-full w-full ${className}`}>{content}</ImageReveal>
      );
    case "parallax":
      return (
        <ImageParallax strength={parallaxStrength} className={`h-full w-full ${className}`}>
          <ImageScaleReveal className="h-full w-full">{content}</ImageScaleReveal>
        </ImageParallax>
      );
    case "scale":
    default:
      return (
        <ImageScaleReveal className={`h-full w-full ${className}`}>
          {content}
        </ImageScaleReveal>
      );
  }
}
