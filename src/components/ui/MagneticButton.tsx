"use client";

import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useMagnetic } from "@/hooks/useMagnetic";
import type { MagneticOptions } from "@/lib/motion/types";

interface MagneticButtonProps extends MagneticOptions {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
  size = "lg",
  onClick,
  strength,
  radius,
  duration,
  ease,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useMagnetic(wrapperRef, { strength, radius, duration, ease });

  return (
    <div ref={wrapperRef} className={className}>
      <Button
        variant={variant}
        size={size}
        href={href}
        onClick={onClick}
        className={className.includes("w-full") ? "w-full" : undefined}
      >
        {children}
      </Button>
    </div>
  );
}
