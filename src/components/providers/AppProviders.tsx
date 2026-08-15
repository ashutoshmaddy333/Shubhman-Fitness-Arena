"use client";

import { type ReactNode } from "react";
import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";
import { ScrollProgressProvider } from "@/components/providers/ScrollProgressProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageTransition } from "@/components/motion/PageTransition";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReducedMotionProvider>
      <ScrollProgressProvider>
        <SmoothScrollProvider>
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </ScrollProgressProvider>
    </ReducedMotionProvider>
  );
}
