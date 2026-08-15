"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AthleteSection } from "@/components/sections/AthleteSection";
import { EquipmentCinemaSection } from "@/components/sections/EquipmentCinemaSection";
import { StrengthZoneSection } from "@/components/sections/StrengthZoneSection";
import { PerformanceZoneSection } from "@/components/sections/PerformanceZoneSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { CoachesSection } from "@/components/sections/CoachesSection";
import { FacilityTourSection } from "@/components/sections/FacilityTourSection";
import { FacilityDetailsSection } from "@/components/sections/FacilityDetailsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { VlogSection } from "@/components/sections/VlogSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { FinalCinematicSection } from "@/components/sections/FinalCinematicSection";
import { HomeFooterSection } from "@/components/sections/HomeFooterSection";
import { usePageScrollTimeline } from "@/lib/gsap/usePageScrollTimeline";

const ForgeCanvas = dynamic(
  () =>
    import("@/components/three/ForgeCanvas").then((mod) => mod.ForgeCanvas),
  { ssr: false },
);

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  usePageScrollTimeline(mainRef);

  return (
    <>
      <ForgeCanvas />
      <main ref={mainRef} id="main-content" className="relative z-[var(--z-content)]">
        <HeroSection />
        <AthleteSection />
        <EquipmentCinemaSection />
        <StrengthZoneSection />
        <PerformanceZoneSection />
        <TrainingSection />
        <CoachesSection />
        <FacilityTourSection />
        <FacilityDetailsSection />
        <CommunitySection />
        <VlogSection />
        <GallerySection />
        <MembershipSection />
        <FinalCinematicSection />
        <HomeFooterSection />
      </main>
    </>
  );
}
