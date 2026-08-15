/** Homepage section registry — scroll heights + page progress ranges */

export interface HomepageSectionMeta {
  id: string;
  number: string;
  label: string;
  scrollHeight: string;
  /** Normalized page progress start (0–1) */
  pageStart: number;
  /** Normalized page progress end (0–1) */
  pageEnd: number;
}

export const HOMEPAGE_SECTIONS: readonly HomepageSectionMeta[] = [
  { id: "hero", number: "01", label: "Entry", scrollHeight: "350vh", pageStart: 0, pageEnd: 0.11 },
  { id: "athlete", number: "02", label: "Athlete", scrollHeight: "280vh", pageStart: 0.11, pageEnd: 0.19 },
  { id: "equipment", number: "03", label: "Equipment", scrollHeight: "320vh", pageStart: 0.19, pageEnd: 0.28 },
  { id: "strength", number: "04", label: "Strength", scrollHeight: "280vh", pageStart: 0.28, pageEnd: 0.36 },
  { id: "performance", number: "05", label: "Performance", scrollHeight: "280vh", pageStart: 0.36, pageEnd: 0.44 },
  { id: "training", number: "06", label: "Training", scrollHeight: "auto", pageStart: 0.44, pageEnd: 0.52 },
  { id: "coaches", number: "07", label: "Coaches", scrollHeight: "auto", pageStart: 0.52, pageEnd: 0.58 },
  { id: "facility", number: "08", label: "Facility", scrollHeight: "420vh", pageStart: 0.58, pageEnd: 0.72 },
  { id: "details", number: "09", label: "Details", scrollHeight: "240vh", pageStart: 0.72, pageEnd: 0.78 },
  { id: "community", number: "10", label: "Community", scrollHeight: "auto", pageStart: 0.78, pageEnd: 0.84 },
  { id: "vlog", number: "11", label: "Journal", scrollHeight: "auto", pageStart: 0.84, pageEnd: 0.88 },
  { id: "gallery", number: "12", label: "Gallery", scrollHeight: "auto", pageStart: 0.88, pageEnd: 0.92 },
  { id: "membership", number: "13", label: "Membership", scrollHeight: "auto", pageStart: 0.92, pageEnd: 0.96 },
  { id: "final", number: "14", label: "Final", scrollHeight: "170vh", pageStart: 0.96, pageEnd: 1 },
] as const;

export const HOMEPAGE_COPY = {
  hero: {
    subtitle: "A PLACE BUILT FOR PROGRESS.",
    enter: "ENTER THE ARENA",
  },
  athlete: {
    title: "BUILT UNDER PRESSURE.",
    body: "Discipline is forged in repetition. Every session compounds. The body adapts when the mind refuses to quit.",
  },
  equipment: {
    title: "BUILT TO PERFORM.",
    body: "Precision equipment. Real weight. No shortcuts. Every piece exists to serve the work.",
  },
  strength: {
    title: "STRENGTH HAS A STANDARD.",
    body: "Squat racks. Platforms. Barbells. The foundation of every serious training floor.",
  },
  performance: {
    title: "MOVE WITH PURPOSE.",
    body: "Conditioning with intent. Rowers, treadmills, bikes — engineered for measurable output.",
  },
  training: {
    title: "TRAINING IS NOT RANDOM.",
    body: "Structured programming across strength, conditioning, mobility, and performance.",
    categories: ["STRENGTH", "CONDITIONING", "MOBILITY", "PERFORMANCE"] as const,
  },
  coaches: {
    title: "EXPERTS WHO PUSH FURTHER.",
    body: "Coaches who understand the science of adaptation and the art of accountability.",
  },
  facility: {
    title: "ENTER THE ARENA.",
    stages: [
      "ENTRANCE",
      "STRENGTH FLOOR",
      "PERFORMANCE AREA",
      "FUNCTIONAL TRAINING",
      "RECOVERY",
      "COMMUNITY",
    ] as const,
  },
  details: {
    title: "EVERY DETAIL HAS A PURPOSE.",
    body: "Rubber flooring. Brushed steel. Concrete walls. Mirrors that reflect the work, not the ego.",
  },
  community: {
    title: "STRONGER TOGETHER.",
    body: "A community built on shared standards. Train alongside people who show up.",
  },
  vlog: {
    title: "FROM INSIDE THE ARENA.",
  },
  gallery: {
    title: "THE ARENA IN MOTION.",
  },
  membership: {
    title: "YOUR NEXT LEVEL STARTS HERE.",
    body: "Access the full facility. Expert coaching. A community that holds the line.",
  },
  final: {
    title: "BECOME MORE.",
    lines: ["BUILD STRENGTH.", "BUILD DISCIPLINE.", "BUILD YOURSELF."] as const,
    cta: "JOIN THE ARENA",
  },
} as const;

export function getSectionMeta(id: string): HomepageSectionMeta | undefined {
  return HOMEPAGE_SECTIONS.find((s) => s.id === id);
}
