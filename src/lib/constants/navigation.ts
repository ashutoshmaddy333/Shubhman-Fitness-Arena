import type { SiteImage } from "@/lib/content/siteImages";
import { SITE_IMAGES } from "@/lib/content/siteImages";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  image?: SiteImage;
}

export const PRIMARY_NAV: NavLink[] = [
  {
    label: "Story",
    href: "#athlete",
    description: "Built under pressure",
    image: {
      src: "/images/nav/nav-story.png",
      alt: "Athlete story",
      aspect: "16/10",
      objectPosition: "center 40%",
    },
  },
  {
    label: "Training",
    href: "#training",
    description: "Structured programming",
    image: {
      src: "/images/nav/nav-training.png",
      alt: "Training floor",
      aspect: "16/10",
      objectPosition: "center 32%",
    },
  },
  {
    label: "Facility",
    href: "#facility",
    description: "Tour the arena",
    image: SITE_IMAGES.facility.wide,
  },
  {
    label: "Coaches",
    href: "#coaches",
    description: "Expert guidance",
    image: {
      src: "/images/nav/nav-coaches.png",
      alt: "Coaches",
      aspect: "3/4",
      objectPosition: "center 25%",
    },
  },
  {
    label: "Membership",
    href: "#membership",
    description: "Join the arena",
    image: SITE_IMAGES.membership.lounge,
  },
  {
    label: "Vlog",
    href: "#vlog",
    description: "Training journal",
    image: {
      src: "/images/nav/nav-vlog.png",
      alt: "Vlog",
      aspect: "16/10",
      objectPosition: "center 30%",
    },
  },
  {
    label: "Gallery",
    href: "#gallery",
    description: "Visual archive",
    image: {
      src: "/images/nav/nav-gallery.png",
      alt: "Gallery",
      aspect: "16/10",
      objectPosition: "center 38%",
    },
  },
  {
    label: "Community",
    href: "#community",
    description: "Train together",
    image: {
      src: "/images/nav/nav-community.png",
      alt: "Community",
      aspect: "16/10",
      objectPosition: "center 28%",
    },
  },
];

export const SECONDARY_NAV: NavLink[] = [
  { label: "Classes", href: "/classes" },
  {
    label: "Community",
    href: "#community",
    image: {
      src: "/images/nav/nav-community.png",
      alt: "Community",
      aspect: "16/10",
      objectPosition: "center 28%",
    },
  },
  { label: "Journal", href: "#vlog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  explore: [
    { label: "Training", href: "#training" },
    { label: "Facility", href: "#facility" },
    { label: "Coaches", href: "#coaches" },
    { label: "Membership", href: "#membership" },
    { label: "Gallery", href: "#gallery" },
  ],
  platform: [
    { label: "Journal", href: "#vlog" },
    { label: "Community", href: "#community" },
    { label: "Story", href: "#athlete" },
    { label: "Events", href: "/events" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "Contact", href: "/contact" },
    { label: "Location", href: "/location" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const FOOTER_CONTACT = {
  email: "hello@shubhmanfitnessarena.com",
  location: "Shubhman Fitness Arena",
  hours: "Mon–Sat · 5:00 AM – 10:00 PM",
} as const;

export const FOOTER_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;
