"use client";

import { useRef, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";
import { VIDEO_PRESETS } from "@/lib/motion/videoPresets";

interface VideoParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function VideoParallax({
  children,
  className = "",
  strength = VIDEO_PRESETS.parallax.strength,
}: VideoParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { strength });

  return (
    <div ref={ref} className={`will-change-transform ${className}`} data-cursor="play">
      {children}
    </div>
  );
}
