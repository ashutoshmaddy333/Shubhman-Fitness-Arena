"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap/registerGSAP";
import { registerGSAP } from "@/lib/gsap/registerGSAP";
import { MOTION_PAGE_TRANSITION } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { BRAND } from "@/lib/constants/assets";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);
  const { reducedMotion } = useReducedMotionContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    registerGSAP();

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const overlay = overlayRef.current;
    const label = labelRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (reducedMotion) return;

    const tl = gsap.timeline();

    tl.set(overlay, { pointerEvents: "auto", clipPath: "inset(0% 0% 100% 0%)" })
      .set(label, { opacity: 0, y: 20 })
      .to(overlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: MOTION_PAGE_TRANSITION.overlayDuration,
        ease: MOTION_PAGE_TRANSITION.ease,
      })
      .to(
        label,
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
        "-=0.2",
      )
      .to(label, { opacity: 0, duration: 0.2, delay: 0.15 })
      .to(overlay, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: MOTION_PAGE_TRANSITION.overlayDuration,
        ease: MOTION_PAGE_TRANSITION.ease,
      })
      .set(overlay, { pointerEvents: "none" });

    gsap.fromTo(
      content,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_PAGE_TRANSITION.duration,
        ease: MOTION_PAGE_TRANSITION.ease,
      },
    );

    return () => {
      tl.kill();
    };
  }, [pathname, reducedMotion]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[calc(var(--z-nav)+10)] bg-[var(--background)] pointer-events-none flex items-center justify-center"
        aria-hidden="true"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <p ref={labelRef} className="type-display-md text-[var(--text)] opacity-0">
          {BRAND.name}
        </p>
      </div>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
