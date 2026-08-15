"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  type CinematicBackdropShot,
  getBackdropShotWeight,
} from "@/lib/three/cinematic/cinematicBackdrops";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface CinematicBackdropPlaneProps {
  shot: CinematicBackdropShot;
  parallaxFactor?: number;
}

const _coverScale = new THREE.Vector3();

/** Single backdrop plane — viewport cover (no letterbox gaps) + scroll crossfade */
export function CinematicBackdropPlane({
  shot,
  parallaxFactor = 1,
}: CinematicBackdropPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera, size } = useThree();
  const { reducedMotion } = useReducedMotionContext();
  const texture = useTexture(shot.src);

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.offset.set(shot.offset?.[0] ?? 0, shot.offset?.[1] ?? 0);
  }, [texture, shot.offset]);

  const basePosition = useMemo(
    () => new THREE.Vector3(0, shot.y, shot.z),
    [shot.y, shot.z],
  );

  useFrame(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (!material || !mesh || !(camera instanceof THREE.PerspectiveCamera)) return;

    const progress = threeMotionStore.pageProgress.current;
    const weight = getBackdropShotWeight(progress, shot);
    material.opacity = weight;
    mesh.visible = weight > 0.004;

    mesh.position.copy(basePosition);

    if (!reducedMotion && weight >= 0.01) {
      const drift = (progress - 0.5) * 1.2 * parallaxFactor;
      mesh.position.x = basePosition.x + drift * 0.28;
      mesh.position.y = basePosition.y + drift * 0.06;
    }

    const distance = Math.abs(camera.position.z - mesh.position.z);
    const vHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    const vWidth = vHeight * (size.width / Math.max(size.height, 1));
    const texAspect = 16 / 9;
    let coverW = vWidth * 1.08;
    let coverH = coverW / texAspect;
    if (coverH < vHeight * 1.08) {
      coverH = vHeight * 1.08;
      coverW = coverH * texAspect;
    }

    _coverScale.set(
      coverW / shot.size[0],
      coverH / shot.size[1],
      1,
    );
    mesh.scale.copy(_coverScale);
  });

  return (
    <mesh ref={meshRef} position={basePosition} renderOrder={-20} visible={false}>
      <planeGeometry args={shot.size} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}
