"use client";

import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";
import { COLORS } from "@/lib/constants/tokens";

/** Development-only floor grid */
export function ForgeDebugGrid() {
  if (!isForgeDebugEnabled()) return null;

  return (
    <gridHelper
      args={[30, 30, COLORS.border, COLORS.surfaceElevated]}
      position={[0, 0.01, 0]}
    />
  );
}
