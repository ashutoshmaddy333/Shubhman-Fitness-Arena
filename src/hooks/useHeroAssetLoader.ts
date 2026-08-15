"use client";

import { useEffect, useState } from "react";
import {
  initializeAssetAvailability,
  isAssetAvailabilityReady,
} from "@/lib/three/assets/assetAvailability";
import {
  getHeroPreloadPaths,
  preloadHeroAssetsAsync,
} from "@/lib/three/loader/preload";

export interface HeroAssetLoadState {
  ready: boolean;
  loaded: number;
  total: number;
}

/** Sync init from build-time manifest — awaits real GLB preload when assets exist */
export function useHeroAssetLoader(): HeroAssetLoadState {
  const [state, setState] = useState<HeroAssetLoadState>({
    ready: false,
    loaded: 0,
    total: 0,
  });

  useEffect(() => {
    let cancelled = false;
    initializeAssetAvailability();

    const paths = getHeroPreloadPaths();
    const total = paths.length;

    if (total === 0) {
      requestAnimationFrame(() => {
        if (!cancelled) {
          setState({ ready: true, loaded: 0, total: 0 });
        }
      });
      return () => {
        cancelled = true;
      };
    }

    setState({ ready: false, loaded: 0, total });

    const loadTimeout = window.setTimeout(() => {
      if (!cancelled) {
        setState({ ready: true, loaded: total, total });
      }
    }, 8000);

    preloadHeroAssetsAsync((loaded, assetTotal) => {
      if (!cancelled) {
        setState((prev) => ({
          ...prev,
          loaded,
          total: assetTotal,
        }));
      }
    }).then(() => {
      if (!cancelled) {
        setState({ ready: true, loaded: total, total });
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
    };
  }, []);

  return {
    ...state,
    ready: state.ready && isAssetAvailabilityReady(),
  };
}
