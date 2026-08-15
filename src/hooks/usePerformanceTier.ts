"use client";

import { useEffect, useState } from "react";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

export type PerformanceTier = "HIGH" | "MEDIUM" | "LOW";

function detectWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768
  );
}

function resolveTier(
  reducedMotion: boolean,
  webgl: boolean,
  mobile: boolean,
  cores: number,
  memory: number | undefined,
): PerformanceTier {
  if (!webgl) return "LOW";
  if (mobile || reducedMotion) return "MEDIUM";
  if (cores <= 4 || (memory !== undefined && memory <= 4)) return "MEDIUM";
  return "HIGH";
}

export function usePerformanceTier(): PerformanceTier {
  const { reducedMotion } = useReducedMotionContext();
  const [tier, setTier] = useState<PerformanceTier>("MEDIUM");

  useEffect(() => {
    const webgl = detectWebGL();
    const mobile = detectMobile();
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;

    setTier(resolveTier(reducedMotion, webgl, mobile, cores, memory));
  }, [reducedMotion]);

  return tier;
}
