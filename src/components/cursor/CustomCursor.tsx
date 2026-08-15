"use client";

import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useMobileMotion } from "@/hooks/useMobileMotion";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { CURSOR_MODES } from "@/lib/motion/hoverPresets";
import { MOTION_CURSOR } from "@/lib/motion/tokens";
import type { CursorMode } from "@/lib/motion/types";

const MODE_LABELS: Partial<Record<CursorMode, string>> = {
  view: "VIEW",
  play: "PLAY",
  explore: "EXPLORE",
  drag: "DRAG",
  external: "OPEN",
};

const MODE_MAP: Record<string, CursorMode> = {
  [CURSOR_MODES.play]: "play",
  [CURSOR_MODES.view]: "view",
  [CURSOR_MODES.explore]: "explore",
  [CURSOR_MODES.drag]: "drag",
  [CURSOR_MODES.external]: "external",
  [CURSOR_MODES.hover]: "hover",
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouchDevice();
  const isMobileMotion = useMobileMotion();
  const { reducedMotion } = useReducedMotionContext();
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");

  useEffect(() => {
    if (isTouch || isMobileMotion || reducedMotion) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      const cursorEl = targetEl.closest("[data-cursor]");
      const cursorAttr = cursorEl?.getAttribute("data-cursor");
      let nextMode: CursorMode = "default";

      if (cursorAttr && MODE_MAP[cursorAttr]) {
        nextMode = MODE_MAP[cursorAttr];
      } else if (targetEl.closest("[data-interactive]")) {
        nextMode = "hover";
      }

      if (nextMode === modeRef.current) return;
      modeRef.current = nextMode;

      const ring = ringRef.current;
      const label = labelRef.current;
      if (!ring || !label) return;

      const isExpanded = nextMode !== "default";
      const size = isExpanded
        ? MOTION_CURSOR.ringSize.hover
        : MOTION_CURSOR.ringSize.default;

      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;

      const labelText = MODE_LABELS[nextMode] ?? "";
      label.textContent = labelText;
      label.style.display = labelText ? "block" : "none";
    };

    let rafId: number;
    const animate = () => {
      const ease = MOTION_CURSOR.followEase;
      position.current.x += (target.current.x - position.current.x) * ease;
      position.current.y += (target.current.y - position.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, isMobileMotion, reducedMotion]);

  if (isTouch || isMobileMotion || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[var(--z-cursor)] pointer-events-none mix-blend-difference"
      aria-hidden="true"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        ref={ringRef}
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white flex items-center justify-center transition-[width,height] duration-300 ease-out"
        style={{
          width: MOTION_CURSOR.ringSize.default,
          height: MOTION_CURSOR.ringSize.default,
        }}
      >
        <span
          ref={labelRef}
          className="type-micro text-white tracking-[0.2em] whitespace-nowrap hidden"
        />
      </div>
    </div>
  );
}
