"use client";

import { useRef, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";
import { MOTION_PARALLAX } from "@/lib/motion/tokens";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  axis?: "x" | "y";
}

export function Parallax({
  children,
  className = "",
  strength = MOTION_PARALLAX.subtle,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { strength, axis });

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
