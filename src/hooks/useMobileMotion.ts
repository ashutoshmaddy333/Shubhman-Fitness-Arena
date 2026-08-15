"use client";

import { useSyncExternalStore } from "react";
import { MOBILE_MOTION_QUERY } from "@/lib/motion/mobileMotion";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(MOBILE_MOTION_QUERY);
  mq.addEventListener("change", callback);
  window.addEventListener("orientationchange", callback);
  window.addEventListener("resize", callback);
  return () => {
    mq.removeEventListener("change", callback);
    window.removeEventListener("orientationchange", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.matchMedia(MOBILE_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMobileMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
