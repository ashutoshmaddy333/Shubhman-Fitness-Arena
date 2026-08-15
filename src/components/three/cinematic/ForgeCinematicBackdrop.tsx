"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { CinematicBackdropPlane } from "@/components/three/cinematic/CinematicBackdropPlane";
import { CINEMATIC_BACKDROP_SHOTS } from "@/lib/three/cinematic/cinematicBackdrops";

function BackdropVignette() {
  return (
    <>
      <mesh position={[0, 1.35, -6.85]} renderOrder={-18}>
        <planeGeometry args={[21, 12]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.28}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -2.8, -6.5]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-17}>
        <planeGeometry args={[26, 10]} />
        <meshBasicMaterial
          color="#050608"
          transparent
          opacity={0.35}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 1.35, -6.7]} renderOrder={-16}>
        <planeGeometry args={[21, 12]} />
        <meshBasicMaterial
          color="#5eb3ff"
          transparent
          opacity={0.025}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

/** AI-generated cinematic gym backdrops — primary 3D visual */
export function ForgeCinematicBackdrop() {
  return (
    <group name="ForgeCinematicBackdrop">
      <Suspense fallback={null}>
        {CINEMATIC_BACKDROP_SHOTS.map((shot, index) => (
          <CinematicBackdropPlane
            key={shot.id}
            shot={shot}
            parallaxFactor={0.8 + index * 0.08}
          />
        ))}
      </Suspense>
      <BackdropVignette />
    </group>
  );
}
