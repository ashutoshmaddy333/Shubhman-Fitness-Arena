"use client";

import { type ReactNode } from "react";
import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";
import { ScrollProgressProvider } from "@/components/providers/ScrollProgressProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
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
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </ScrollProgressProvider>
    </ReducedMotionProvider>
  );
}
