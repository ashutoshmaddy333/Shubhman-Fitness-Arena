import { HERO } from "@/lib/constants/tokens";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";

export const HERO_SCROLL = {
  triggerHeight: HERO.scrollHeight,
  scrub: FORGE_SCRUB.master,
  start: "top top",
  end: "bottom bottom",
} as const;

export const PHILOSOPHY_SCROLL = {
  content: { start: "top 75%", end: "top 30%" },
  values: { start: "top 85%", end: "top 50%" },
} as const;

export const PAGE_SCROLL = {
  scrub: FORGE_SCRUB.master,
  start: "top top",
  end: "bottom bottom",
} as const;

export const CINEMATIC_SECTION_SCROLL = {
  start: "top top",
  end: "bottom bottom",
  scrub: FORGE_SCRUB.cinematic,
} as const;

export const FINAL_SECTION_SCROLL = {
  start: "top top",
  end: "bottom bottom",
  scrub: FORGE_SCRUB.cinematic,
} as const;
