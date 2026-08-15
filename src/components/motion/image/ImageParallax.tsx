"use client";

import { useRef, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";
import { MOTION_PARALLAX } from "@/lib/motion/tokens";

interface ImageParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function ImageParallax({
  children,
  className = "",
  strength = MOTION_PARALLAX.normal,
}: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { strength });

  return (
    <div ref={ref} className={`will-change-transform ${className}`} data-cursor="view">
      {children}
    </div>
  );
}
