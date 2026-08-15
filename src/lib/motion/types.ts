import type { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  toggleActions?: string;
  markers?: boolean;
  once?: boolean;
}

export interface RevealOptions extends ScrollAnimationOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

export interface ParallaxOptions extends ScrollAnimationOptions {
  strength?: number;
  axis?: "y" | "x";
}

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  duration?: number;
  ease?: string;
}

export interface TextRevealOptions extends RevealOptions {
  splitBy?: "block" | "lines" | "words" | "chars";
}

export interface ImageRevealOptions extends RevealOptions {
  clipDirection?: "up" | "down" | "left" | "right";
}

export interface SectionProgressOptions {
  id?: string;
  start?: string;
  end?: string;
}

export type ScrollTriggerCallback = (self: ScrollTrigger) => void;

export type CursorMode =
  | "default"
  | "hover"
  | "view"
  | "play"
  | "drag"
  | "external"
  | "explore";

export interface ThreeMotionTarget {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export interface ThreeCameraMotion {
  position?: [number, number, number];
  rotation?: [number, number, number];
  fov?: number;
  lookAt?: [number, number, number];
}

export interface ThreeLightMotion {
  intensity?: number;
  color?: string;
}
