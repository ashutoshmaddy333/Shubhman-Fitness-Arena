"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import {
  LIGHTING_PRESETS,
  SCENE_PRESET_MAP,
} from "@/lib/three/lighting/presets";
import { SHADOW_CONFIG } from "@/lib/three/lighting/shadowConfig";

interface SceneLightingProps {
  preset?: keyof typeof SCENE_PRESET_MAP;
}

export function SceneLighting({ preset = "hero" }: SceneLightingProps) {
  const presetName = SCENE_PRESET_MAP[preset];
  const config = LIGHTING_PRESETS[presetName];
  const tier = usePerformanceTier();
  const { heroProgress } = useScrollProgress();
  const { reducedMotion } = useReducedMotionContext();

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.SpotLight>(null);

  const shadowConfig = SHADOW_CONFIG[tier];
  const shadowSize = config.shadowMapSize[tier];

  useFrame(() => {
    if (reducedMotion) return;

    const storeMod = threeMotionStore.lighting;
    const cinematic = presetName === "HERO";

    if (ambientRef.current) {
      ambientRef.current.intensity = cinematic
        ? storeMod.ambient.current
        : config.ambient.intensity * storeMod.ambient.current;
    }
    if (keyRef.current) {
      keyRef.current.intensity = cinematic
        ? storeMod.key.current
        : config.key.intensity * storeMod.key.current;
    }
    if (fillRef.current && config.fill) {
      fillRef.current.intensity = cinematic
        ? storeMod.fill.current
        : config.fill.intensity * storeMod.fill.current;
    }
    if (rimRef.current) {
      const scrollBoost = cinematic ? heroProgress.current * 0.15 : 0;
      rimRef.current.intensity = cinematic
        ? storeMod.rim.current + scrollBoost
        : config.rim.intensity * storeMod.rim.current;
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={config.ambient.intensity}
        color={config.ambient.color}
      />
      <directionalLight
        ref={keyRef}
        position={config.key.position}
        intensity={config.key.intensity}
        color={config.key.color}
        castShadow={shadowConfig.enabled}
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-bias={shadowConfig.bias}
        shadow-normalBias={shadowConfig.normalBias}
      />
      {config.fill && (
        <directionalLight
          ref={fillRef}
          position={config.fill.position}
          intensity={config.fill.intensity}
          color={config.fill.color}
        />
      )}
      <spotLight
        ref={rimRef}
        position={config.rim.position}
        angle={config.rim.angle ?? 0.4}
        penumbra={config.rim.penumbra ?? 0.8}
        intensity={config.rim.intensity}
        color={config.rim.color}
        distance={config.rim.distance ?? 20}
      />
      {config.accent && (
        <pointLight
          position={config.accent.position}
          intensity={
            presetName === "HERO"
              ? config.accent.intensity *
                THREE.MathUtils.lerp(0.5, 1, threeMotionStore.environment.current)
              : config.accent.intensity
          }
          color={config.accent.color}
        />
      )}
    </>
  );
}
