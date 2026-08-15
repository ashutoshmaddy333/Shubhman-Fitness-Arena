import type { AnimationState } from "@/lib/three/assets/types";

/** Cinematic shot identifiers — one master timeline drives all systems */
export type CinematicShotName =
  | "SHOT_01_ESTABLISHING"
  | "SHOT_02_APPROACH"
  | "SHOT_03_ATHLETE_REVEAL"
  | "SHOT_04_ATHLETE_CLOSE"
  | "SHOT_05_ATHLETE_ORBIT"
  | "SHOT_06_PASS_BY"
  | "SHOT_07_GYM_REVEAL"
  | "SHOT_08_GYM_ENTRY"
  | "SHOT_09_FINAL";

export interface CinematicShotRange {
  shot: CinematicShotName;
  start: number;
  end: number;
  label: string;
}

/** Master cinematic timeline — safe for SSR (no three.js) */
export const CINEMATIC_TIMELINE: readonly CinematicShotRange[] = [
  { shot: "SHOT_01_ESTABLISHING", start: 0.0, end: 0.1, label: "Establishing" },
  { shot: "SHOT_02_APPROACH", start: 0.1, end: 0.25, label: "Approach" },
  { shot: "SHOT_03_ATHLETE_REVEAL", start: 0.25, end: 0.4, label: "Athlete Reveal" },
  { shot: "SHOT_04_ATHLETE_CLOSE", start: 0.4, end: 0.55, label: "Close" },
  { shot: "SHOT_05_ATHLETE_ORBIT", start: 0.55, end: 0.7, label: "Orbit" },
  { shot: "SHOT_06_PASS_BY", start: 0.7, end: 0.82, label: "Pass By" },
  { shot: "SHOT_07_GYM_REVEAL", start: 0.82, end: 0.92, label: "Gym Reveal" },
  { shot: "SHOT_08_GYM_ENTRY", start: 0.92, end: 0.97, label: "Gym Entry" },
  { shot: "SHOT_09_FINAL", start: 0.97, end: 1.0, label: "Final" },
] as const;

export type CinematicEventName =
  | "heroStart"
  | "athleteReveal"
  | "orbitStart"
  | "gymReveal"
  | "gymEntry"
  | "heroComplete";

export const CINEMATIC_EVENT_THRESHOLDS: Readonly<
  Record<CinematicEventName, number>
> = {
  heroStart: 0.0,
  athleteReveal: 0.25,
  orbitStart: 0.55,
  gymReveal: 0.82,
  gymEntry: 0.92,
  heroComplete: 0.97,
};

export function clampProgress(progress: number): number {
  return Math.min(1, Math.max(0, progress));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getSegmentProgress(
  progress: number,
  segmentStart: number,
  segmentEnd: number,
): number {
  const p = clampProgress(progress);
  if (p <= segmentStart) return 0;
  if (p >= segmentEnd) return 1;
  return (p - segmentStart) / (segmentEnd - segmentStart);
}

/** Athlete animation state derived from cinematic progress — SSR-safe */
export function getAthleteAnimationState(progress: number): AnimationState {
  const p = clampProgress(progress);

  if (p < 0.2) return "IDLE";
  if (p < 0.35) return "BREATHING";
  if (p < 0.65) return "IDLE";
  if (p < 0.8) return "TRAIN";
  if (p < 0.9) return "POSE";
  return "IDLE";
}
