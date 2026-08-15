"use client";

import { useFrame } from "@react-three/fiber";
import { getLoadedModelPaths } from "@/lib/three/loader/modelCache";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";

/** Collects renderer stats inside the Canvas — dev only */
export function ForgeDebugCollector() {
  useFrame((state, delta) => {
    if (!isForgeDebugEnabled()) return;

    const { gl } = state;
    const info = gl.info;
    const store = threeMotionStore.debug;

    store.frameTime.current = delta * 1000;
    store.fps.current = delta > 0 ? 1 / delta : 0;
    store.triangles.current = info.render.triangles;
    store.drawCalls.current = info.render.calls;
    store.textures.current = info.memory.textures;
    store.geometries.current = info.memory.geometries;
    store.models.current = getLoadedModelPaths().length;
    store.dpr.current = gl.getPixelRatio();
    store.textureMemoryMb.current = info.memory.textures * 4;
  });

  return null;
}
