"use client";

import { Stats } from "@react-three/drei";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";

/** In-canvas FPS stats — only when NEXT_PUBLIC_FORGE_DEBUG=true */
export function ForgeDebugStats() {
  if (!isForgeDebugEnabled()) return null;
  return <Stats showPanel={0} className="forge-debug-stats" />;
}

export { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";
