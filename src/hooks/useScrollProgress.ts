"use client";

import { useContext } from "react";
import { ScrollProgressContext } from "@/components/providers/ScrollProgressProvider";

export function useScrollProgress() {
  const context = useContext(ScrollProgressContext);
  if (!context) {
    throw new Error(
      "useScrollProgress must be used within ScrollProgressProvider",
    );
  }
  return context;
}

export {
  useScrollProgressRegistry,
  useSectionProgressRef,
} from "@/components/providers/ScrollProgressProvider";
