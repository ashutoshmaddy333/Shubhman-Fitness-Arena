/** Centralized design tokens — mirror CSS variables for JS/Three.js usage */

export const COLORS = {
  background: "#050505",
  surface: "#0d0d0d",
  surfaceElevated: "#141414",
  border: "#1f1f1f",
  text: "#f5f5f5",
  muted: "#858585",
  accent: "#d7ff00",
  accentMuted: "rgba(215, 255, 0, 0.12)",
} as const;

export const Z_INDEX = {
  canvas: 0,
  content: 10,
  nav: 50,
  overlay: 40,
  cursor: 9999,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export const RADII = {
  none: "0",
  sm: "2px",
  md: "4px",
  full: "9999px",
} as const;

export const HERO = {
  scrollHeight: "350vh",
  scrub: 1.2,
} as const;

export const PARTICLE_COUNTS = {
  HIGH: 55,
  MEDIUM: 28,
  LOW: 0,
} as const;
