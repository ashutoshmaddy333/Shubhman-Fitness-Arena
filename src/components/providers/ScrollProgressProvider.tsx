"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { setHeroProgress as setThreeHeroProgress, setPageProgress as setThreePageProgress } from "@/lib/three/threeMotionStore";

export interface ScrollProgressContextValue {
  heroProgress: React.MutableRefObject<number>;
  pageProgress: React.MutableRefObject<number>;
  setHeroProgress: (value: number) => void;
  setPageProgress: (value: number) => void;
  registerSection: (id: string, ref: React.MutableRefObject<number>) => void;
  unregisterSection: (id: string) => void;
  getSectionProgress: (id: string) => number;
}

export const ScrollProgressContext =
  createContext<ScrollProgressContextValue | null>(null);

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const heroProgress = useRef(0);
  const pageProgress = useRef(0);
  const sectionsRef = useRef(new Map<string, React.MutableRefObject<number>>());

  const setHeroProgress = useCallback((value: number) => {
    heroProgress.current = value;
    setThreeHeroProgress(value);
  }, []);

  const setPageProgress = useCallback((value: number) => {
    pageProgress.current = value;
    setThreePageProgress(value);
  }, []);

  const registerSection = useCallback(
    (id: string, ref: React.MutableRefObject<number>) => {
      sectionsRef.current.set(id, ref);
    },
    [],
  );

  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  const getSectionProgress = useCallback((id: string) => {
    return sectionsRef.current.get(id)?.current ?? 0;
  }, []);

  return (
    <ScrollProgressContext.Provider
      value={{
        heroProgress,
        pageProgress,
        setHeroProgress,
        setPageProgress,
        registerSection,
        unregisterSection,
        getSectionProgress,
      }}
    >
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgressRegistry() {
  const context = useContext(ScrollProgressContext);
  if (!context) {
    throw new Error(
      "useScrollProgressRegistry must be used within ScrollProgressProvider",
    );
  }
  return context;
}

/** Subscribe to a registered section's progress via ref (no re-renders) */
export function useSectionProgressRef(id: string): RefObject<number> {
  const { getSectionProgress } = useScrollProgressRegistry();
  const ref = useRef(0);

  ref.current = getSectionProgress(id);
  return ref;
}
