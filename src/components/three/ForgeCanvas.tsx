"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";
import { ForgeScene } from "@/components/three/ForgeScene";
import { WebGLFallback } from "@/components/three/WebGLFallback";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { CinematicDebugOverlay } from "@/components/three/debug/CinematicDebugOverlay";
import { HeroLoadingExperience } from "@/components/three/hero/HeroLoadingExperience";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useHeroAssetLoader } from "@/hooks/useHeroAssetLoader";
import {
  getEffectiveTier,
  getTier3DConfig,
} from "@/lib/three/performance/tierConfig";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ForgeCanvas() {
  const { reducedMotion } = useReducedMotionContext();
  const rawTier = usePerformanceTier();
  const tier = getEffectiveTier(rawTier, reducedMotion);
  const tierConfig = getTier3DConfig(tier);
  const { ready: assetsReady, loaded, total } = useHeroAssetLoader();
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebglSupported(detectWebGL());
    document.documentElement.dataset.forgeDebug = isForgeDebugEnabled()
      ? "true"
      : "false";
  }, []);

  if (!mounted) return null;

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  const dpr = reducedMotion ? 1 : tierConfig.dpr;

  return (
    <>
      <HeroLoadingExperience
        visible={!assetsReady}
        loaded={loaded}
        total={total}
      />
      <div className="forge-canvas" aria-hidden="true">
        <SceneErrorBoundary>
          {assetsReady && (
            <Canvas
              shadows={tierConfig.shadows}
              dpr={dpr}
              camera={{ position: [0, 1.2, 12], fov: 45, near: 0.1, far: 100 }}
              gl={{
                antialias: tierConfig.antialias,
                alpha: false,
                powerPreference: "high-performance",
              }}
              frameloop={reducedMotion ? "demand" : "always"}
            >
              <ForgeScene />
            </Canvas>
          )}
        </SceneErrorBoundary>
        <CinematicDebugOverlay />
      </div>
    </>
  );
}
