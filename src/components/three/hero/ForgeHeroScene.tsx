"use client";

import { Suspense } from "react";
import { CameraRig } from "@/components/three/CameraRig";
import { SceneLighting } from "@/components/three/SceneLighting";
import { ForgeCinematicBackdrop } from "@/components/three/cinematic/ForgeCinematicBackdrop";
import { CINEMATIC_IMAGE_BACKDROP } from "@/lib/three/cinematic/cinematicBackdrops";
import { HeroEnvironment } from "@/components/three/hero/HeroEnvironment";
import { HeroAthlete } from "@/components/three/hero/HeroAthlete";
import { ForgeWorldEquipment } from "@/components/three/world/ForgeWorldEquipment";
import { Particles } from "@/components/three/Particles";
import { ForgeDebugCollector } from "@/components/three/debug/ForgeDebugCollector";
import { ForgeDebugGrid } from "@/components/three/debug/ForgeDebugGrid";

/** Modular cinematic hero scene — AI image backdrops when enabled */
export function ForgeHeroScene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 28, 55]} />
      <Suspense fallback={null}>
        <CameraRig />
        <SceneLighting preset="hero" />
        <ForgeCinematicBackdrop />
        {!CINEMATIC_IMAGE_BACKDROP && (
          <>
            <HeroEnvironment />
            <HeroAthlete />
            <ForgeWorldEquipment />
          </>
        )}
        <Particles />
        <ForgeDebugGrid />
        <ForgeDebugCollector />
      </Suspense>
    </>
  );
}
