export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  span: "large" | "medium" | "small";
  aspect?: string;
  objectPosition?: string;
}

const GALLERY_ASPECT: Record<string, string> = {
  large: "16/10",
  medium: "4/5",
  small: "1/1",
};

const GALLERY_FOCAL: Record<string, string> = {
  "gallery-gym-interior.png": "center center",
  "gallery-squat-rack.png": "center 38%",
  "gallery-barbell.png": "center center",
  "gallery-plates.png": "center center",
  "gallery-training.png": "center 32%",
  "gallery-kettlebells.png": "center 45%",
  "gallery-athlete-deadlift.png": "center 40%",
  "zone-cardio.png": "center center",
  "zone-boxing.png": "center 35%",
  "zone-recovery.png": "center center",
  "zone-locker.png": "center center",
  "facility-wide.png": "center center",
  "gallery-chalk-grip.png": "center center",
  "hero-dawn-gym.png": "center center",
  "community-session.png": "center 28%",
};

function galleryMeta(src: string, span: GalleryItem["span"]) {
  const file = src.split("/").pop() ?? "";
  return {
    aspect: GALLERY_ASPECT[span],
    objectPosition: GALLERY_FOCAL[file] ?? "center center",
  };
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/gallery-athlete-deadlift.png",
    alt: "Athlete deadlifting on platform",
    category: "Training",
    width: 1200,
    height: 675,
    span: "large",
    ...galleryMeta("/images/gallery/gallery-athlete-deadlift.png", "large"),
  },
  {
    id: "g2",
    src: "/images/gallery/gallery-kettlebells.png",
    alt: "Kettlebells and dumbbells detail",
    category: "Equipment",
    width: 600,
    height: 600,
    span: "small",
    ...galleryMeta("/images/gallery/gallery-kettlebells.png", "small"),
  },
  {
    id: "g3",
    src: "/images/facility/facility-wide.png",
    alt: "Full facility aerial view",
    category: "Facility",
    width: 1200,
    height: 675,
    span: "large",
    ...galleryMeta("/images/facility/facility-wide.png", "large"),
  },
  {
    id: "g4",
    src: "/images/gallery/gallery-barbell.png",
    alt: "Barbell knurling detail",
    category: "Details",
    width: 600,
    height: 600,
    span: "small",
    ...galleryMeta("/images/gallery/gallery-barbell.png", "small"),
  },
  {
    id: "g5",
    src: "/images/zones/zone-boxing.png",
    alt: "Boxing area with heavy bags",
    category: "Zones",
    width: 800,
    height: 1000,
    span: "medium",
    ...galleryMeta("/images/zones/zone-boxing.png", "medium"),
  },
  {
    id: "g6",
    src: "/images/gallery/gallery-squat-rack.png",
    alt: "Squat rack in dramatic light",
    category: "Equipment",
    width: 800,
    height: 600,
    span: "medium",
    ...galleryMeta("/images/gallery/gallery-squat-rack.png", "medium"),
  },
  {
    id: "g7",
    src: "/images/zones/zone-cardio.png",
    alt: "Cardio zone with treadmills",
    category: "Zones",
    width: 1200,
    height: 675,
    span: "large",
    ...galleryMeta("/images/zones/zone-cardio.png", "large"),
  },
  {
    id: "g8",
    src: "/images/zones/zone-recovery.png",
    alt: "Recovery and mobility zone",
    category: "Zones",
    width: 600,
    height: 600,
    span: "small",
    ...galleryMeta("/images/zones/zone-recovery.png", "small"),
  },
  {
    id: "g9",
    src: "/images/gallery/gallery-training.png",
    alt: "Training floor perspective",
    category: "Training",
    width: 800,
    height: 1000,
    span: "medium",
    ...galleryMeta("/images/gallery/gallery-training.png", "medium"),
  },
  {
    id: "g10",
    src: "/images/gallery/gallery-plates.png",
    alt: "Weight plates stacked",
    category: "Equipment",
    width: 600,
    height: 600,
    span: "small",
    ...galleryMeta("/images/gallery/gallery-plates.png", "small"),
  },
  {
    id: "g11",
    src: "/images/zones/zone-locker.png",
    alt: "Premium locker room corridor",
    category: "Facility",
    width: 800,
    height: 1000,
    span: "medium",
    ...galleryMeta("/images/zones/zone-locker.png", "medium"),
  },
  {
    id: "g12",
    src: "/images/community/community-session.png",
    alt: "Group training session",
    category: "Community",
    width: 1200,
    height: 675,
    span: "large",
    ...galleryMeta("/images/community/community-session.png", "large"),
  },
  {
    id: "g13",
    src: "/images/gallery/gallery-chalk-grip.png",
    alt: "Chalk-covered hands gripping barbell",
    category: "Details",
    width: 600,
    height: 600,
    span: "small",
    ...galleryMeta("/images/gallery/gallery-chalk-grip.png", "small"),
  },
  {
    id: "g14",
    src: "/images/hero/hero-dawn-gym.png",
    alt: "Gym at dawn with golden light",
    category: "Facility",
    width: 1200,
    height: 675,
    span: "large",
    ...galleryMeta("/images/hero/hero-dawn-gym.png", "large"),
  },
] as const;
