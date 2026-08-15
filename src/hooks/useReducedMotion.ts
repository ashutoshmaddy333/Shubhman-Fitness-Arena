"use client";

import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

/** @deprecated Use useReducedMotionContext instead */
export function useReducedMotion(): boolean {
  const { reducedMotion } = useReducedMotionContext();
  return reducedMotion;
}
