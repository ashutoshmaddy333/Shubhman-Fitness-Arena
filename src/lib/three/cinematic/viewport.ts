export type ViewportProfile = "desktop" | "tablet" | "mobile";

export function getViewportProfile(width: number): ViewportProfile {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Camera distance multiplier per viewport — mobile pulls back for clarity */
export const VIEWPORT_CAMERA_SCALE: Record<ViewportProfile, number> = {
  desktop: 1,
  tablet: 1.08,
  mobile: 1.18,
};

/** FOV offset per viewport */
export const VIEWPORT_FOV_OFFSET: Record<ViewportProfile, number> = {
  desktop: 0,
  tablet: 2,
  mobile: 5,
};
