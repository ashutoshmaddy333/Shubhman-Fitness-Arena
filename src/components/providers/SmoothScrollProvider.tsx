"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/registerGSAP";
import { FORGE_LENIS } from "@/lib/motion/scrollEngine";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { LenisContext } from "@/components/providers/LenisContext";
import { threeMotionStore } from "@/lib/three/threeMotionStore";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    registerGSAP();

    if (reducedMotion) {
      setLenis(null);
      threeMotionStore.scrollVelocity.current = 0;
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      lerp: FORGE_LENIS.lerp,
      wheelMultiplier: FORGE_LENIS.wheelMultiplier,
      touchMultiplier: FORGE_LENIS.touchMultiplier,
      smoothWheel: FORGE_LENIS.smoothWheel,
      syncTouch: FORGE_LENIS.syncTouch,
      syncTouchLerp: FORGE_LENIS.syncTouchLerp,
      autoRaf: FORGE_LENIS.autoRaf,
      orientation: "vertical",
    });

    setLenis(instance);

    let lastScroll = instance.scroll;
    let lastTime = performance.now();
    let velocitySmoothed = 0;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const delta = instance.scroll - lastScroll;
      const instant = delta / dt;
      velocitySmoothed += (instant - velocitySmoothed) * 0.22;
      threeMotionStore.scrollVelocity.current = Math.max(
        -2.5,
        Math.min(2.5, velocitySmoothed),
      );
      lastScroll = instance.scroll;
      lastTime = now;
      ScrollTrigger.update();
    };

    instance.on("scroll", onScroll);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };

    const onRefresh = () => instance.resize();

    gsap.ticker.add(tickerCallback);
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      gsap.ticker.remove(tickerCallback);
      instance.destroy();
      threeMotionStore.scrollVelocity.current = 0;
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
