"use client";

import { useEffect, useState } from "react";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { getLoadedModelPaths } from "@/lib/three/loader/modelCache";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { getEffectiveTier } from "@/lib/three/performance/tierConfig";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

const CAMERA_DEBUG = process.env.NEXT_PUBLIC_FORGE_CAMERA_DEBUG === "true";

function formatShotName(shot: string): string {
  return shot.replace("SHOT_", "").replace(/_/g, " ");
}

/** Development-only panel — bottom-right, clear of CTA */
export function CinematicDebugOverlay() {
  const rawTier = usePerformanceTier();
  const { reducedMotion } = useReducedMotionContext();
  const tier = getEffectiveTier(rawTier, reducedMotion);
  const [info, setInfo] = useState({
    fps: 0,
    frameTime: 0,
    models: 0,
    triangles: 0,
    drawCalls: 0,
    textures: 0,
    textureMemoryMb: 0,
    dpr: 1,
    progress: 0,
    shot: "SHOT_01_ESTABLISHING",
    zone: "entry",
    camera: null as typeof threeMotionStore.camera.debug,
    loadedModels: 0,
  });

  useEffect(() => {
    if (!isForgeDebugEnabled()) return;

    const interval = setInterval(() => {
      const dbg = threeMotionStore.debug;
      setInfo({
        fps: Math.round(dbg.fps.current),
        frameTime: dbg.frameTime.current,
        models: dbg.models.current,
        triangles: dbg.triangles.current,
        drawCalls: dbg.drawCalls.current,
        textures: dbg.textures.current,
        textureMemoryMb: dbg.textureMemoryMb.current,
        dpr: dbg.dpr.current,
        progress: threeMotionStore.cinematic.progress.current,
        shot: threeMotionStore.cinematic.currentShot.current,
        zone: threeMotionStore.currentZone.current,
        camera: threeMotionStore.camera.debug,
        loadedModels: getLoadedModelPaths().length,
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isForgeDebugEnabled()) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[var(--z-overlay)] min-w-[200px] rounded bg-black/90 px-3 py-2.5 font-mono text-[10px] leading-[1.55] text-white/90"
      aria-hidden="true"
    >
      <div className="mb-1.5 text-[9px] font-semibold tracking-widest text-[var(--accent)]">
        FORGE DEBUG
      </div>
      <Row label="FPS" value={String(info.fps)} />
      <Row label="Frame time" value={`${info.frameTime.toFixed(1)}ms`} />
      <div className="my-1.5 border-b border-white/15" />
      <Row label="Models" value={String(info.models)} />
      <Row label="GLB loaded" value={String(info.loadedModels)} />
      <Row label="Triangles" value={formatK(info.triangles)} />
      <Row label="Draw calls" value={String(info.drawCalls)} />
      <Row label="Textures" value={String(info.textures)} />
      <Row label="Texture memory" value={`~${info.textureMemoryMb}MB`} />
      <div className="my-1.5 border-b border-white/15" />
      <Row label="DPR" value={String(info.dpr)} />
      <Row label="Tier" value={tier} />
      <div className="my-1.5 border-b border-white/15" />
      <Row label="Cinematic" value={info.progress.toFixed(2)} />
      <Row label="Zone" value={info.zone} />
      <Row label="Shot" value={formatShotName(info.shot)} />
      {CAMERA_DEBUG && info.camera && (
        <div className="mt-1.5 border-t border-white/15 pt-1.5 opacity-70">
          <div>Cam [{info.camera.position.map((v) => v.toFixed(1)).join(", ")}]</div>
          <div>FOV {info.camera.fov.toFixed(1)}</div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/55">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function formatK(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}
