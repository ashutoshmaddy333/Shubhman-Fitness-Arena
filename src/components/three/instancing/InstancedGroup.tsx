"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { getTier3DConfig } from "@/lib/three/performance/tierConfig";

export interface InstancedMeshProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  count: number;
  positions: [number, number, number][];
  scales?: number[];
  castShadow?: boolean;
  receiveShadow?: boolean;
}

/** Reusable instancing for repeated static objects (dumbbells, plates, lights) */
export function InstancedGroup({
  geometry,
  material,
  count,
  positions,
  scales,
  castShadow = false,
  receiveShadow = true,
}: InstancedMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tier = usePerformanceTier();
  const tierConfig = getTier3DConfig(tier);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !tierConfig.enableInstancing) return;

    positions.forEach((pos, i) => {
      dummy.position.set(...pos);
      const s = scales?.[i] ?? 1;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [positions, scales, dummy, tierConfig.enableInstancing]);

  if (!tierConfig.enableInstancing || count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}
