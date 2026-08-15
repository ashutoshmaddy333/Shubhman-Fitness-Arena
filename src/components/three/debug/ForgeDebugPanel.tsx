"use client";

import { useEffect, useState } from "react";
import { getLoadedModelPaths } from "@/lib/three/loader/modelCache";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";

/** DOM overlay for asset pipeline diagnostics — development only */
export function ForgeDebugPanel() {
  const [info, setInfo] = useState({ models: 0, paths: [] as string[] });

  useEffect(() => {
    if (!isForgeDebugEnabled()) return;

    const interval = setInterval(() => {
      const paths = getLoadedModelPaths();
      setInfo({ models: paths.length, paths });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isForgeDebugEnabled()) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-[9999] rounded bg-black/80 px-3 py-2 font-mono text-[10px] text-white/80"
      aria-hidden="true"
    >
      <div>Loaded models: {info.models}</div>
      {info.paths.map((p) => (
        <div key={p} className="truncate opacity-60">
          {p}
        </div>
      ))}
    </div>
  );
}
