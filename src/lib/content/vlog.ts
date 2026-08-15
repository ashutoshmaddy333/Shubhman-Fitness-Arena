export interface VlogEntry {
  title: string;
  category: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
}

export const VLOG_ENTRIES: readonly VlogEntry[] = [
  {
    title: "The First Rep",
    category: "Training Log",
    slug: "the-first-rep",
    excerpt: "Why the opening set sets the tone for everything that follows.",
    image: "/images/vlog/vlog-training-log.png",
    date: "2026-03-12",
    readTime: "4 min",
  },
  {
    title: "Recovery Is Part of the Work",
    category: "Coach's Note",
    slug: "recovery-is-part-of-the-work",
    excerpt: "Adaptation happens between sessions. Rest is not optional.",
    image: "/images/zones/zone-recovery.png",
    date: "2026-03-08",
    readTime: "6 min",
  },
  {
    title: "Six Months In",
    category: "Member Story",
    slug: "six-months-in",
    excerpt: "Consistency over intensity. A member's path through the arena.",
    image: "/images/community/community-session.png",
    date: "2026-02-28",
    readTime: "5 min",
  },
  {
    title: "Floor Layout Notes",
    category: "Facility Journal",
    slug: "floor-layout-notes",
    excerpt: "How we designed the strength floor for flow and focus.",
    image: "/images/facility/facility-wide.png",
    date: "2026-02-20",
    readTime: "3 min",
  },
  {
    title: "Progressive Overload, Explained",
    category: "Performance Guide",
    slug: "progressive-overload",
    excerpt: "The principle behind every serious training program.",
    image: "/images/gallery/gallery-athlete-deadlift.png",
    date: "2026-02-14",
    readTime: "7 min",
  },
  {
    title: "Coaching the Details",
    category: "Coach's Note",
    slug: "coaching-the-details",
    excerpt: "Small cues that change how every rep feels under load.",
    image: "/images/vlog/vlog-coaching.png",
    date: "2026-02-08",
    readTime: "5 min",
  },
] as const;
