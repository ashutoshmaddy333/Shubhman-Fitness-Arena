"use client";

import { useEffect } from "react";
import { gsap, registerGSAP } from "@/lib/gsap/registerGSAP";
import { PAGE_SCROLL } from "@/lib/gsap/scrollConfig";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { getPageZone } from "@/lib/three/cinematic/pageTimeline.constants";
import { setPageZone } from "@/lib/three/threeMotionStore";

/** Master homepage scroll — drives pageProgress + 3D camera journey */
export function usePageScrollTimeline(
  mainRef: React.RefObject<HTMLElement | null>,
) {
  const { setPageProgress } = useScrollProgress();
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    registerGSAP();

    const main = mainRef.current;
    if (!main) return;

    if (reducedMotion) {
      setPageProgress(0);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: main,
          start: PAGE_SCROLL.start,
          end: PAGE_SCROLL.end,
          scrub: PAGE_SCROLL.scrub,
          onUpdate: (self) => {
            setPageProgress(self.progress);
            setPageZone(getPageZone(self.progress));
          },
        },
      });
    }, main);

    return () => ctx.revert();
  }, [mainRef, setPageProgress, reducedMotion]);
}
