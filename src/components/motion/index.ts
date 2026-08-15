/** FORGE® Motion System — public API */

// Text
export { SplitText } from "@/components/motion/text/SplitText";
export { RevealText } from "@/components/motion/text/RevealText";
export { MaskText } from "@/components/motion/text/MaskText";
export { LineReveal } from "@/components/motion/text/LineReveal";
export { WordReveal } from "@/components/motion/text/WordReveal";
export { CharacterReveal } from "@/components/motion/text/CharacterReveal";

// Image
export { ImageReveal } from "@/components/motion/image/ImageReveal";
export { ImageMaskReveal } from "@/components/motion/image/ImageMaskReveal";
export { ImageParallax } from "@/components/motion/image/ImageParallax";
export { ImageScaleReveal } from "@/components/motion/image/ImageScaleReveal";

// Video
export { VideoReveal } from "@/components/motion/video/VideoReveal";
export { VideoParallax } from "@/components/motion/video/VideoParallax";
export { VideoScaleReveal } from "@/components/motion/video/VideoScaleReveal";

// Core
export { Parallax } from "@/components/motion/Parallax";
export { HoverMotion, HOVER_PRESETS } from "@/components/motion/HoverMotion";
export { PageTransition } from "@/components/motion/PageTransition";

// Hooks
export { useReveal } from "@/hooks/useReveal";
export { useParallax, useParallaxProgress } from "@/hooks/useParallax";
export { useScrollAnimation } from "@/hooks/useScrollAnimation";
export { useSectionProgress } from "@/hooks/useSectionProgress";
export { useMagnetic } from "@/hooks/useMagnetic";
export { useHoverMotion } from "@/hooks/useHoverMotion";
export { useThreeObjectMotion, applyMotionToObject } from "@/hooks/useThreeObjectMotion";

// Tokens & types
export * from "@/lib/motion/tokens";
export type * from "@/lib/motion/types";
