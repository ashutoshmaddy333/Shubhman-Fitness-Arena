/** Mobile / touch motion profile — native scroll + simpler reveals */

export const MOBILE_MOTION_QUERY = "(max-width: 1023px), (pointer: coarse)";

export function isMobileMotionDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MOTION_QUERY).matches;
}

export const FORGE_SCROLL_REVEAL_MOBILE = {
  start: "top 96%",
  end: "top 72%",
  sectionStart: "top 95%",
  sectionEnd: "top 55%",
} as const;
