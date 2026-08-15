import { processCinematicEvents } from "@/lib/three/cinematic/events";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { LIGHTING_PRESETS } from "@/lib/three/lighting/presets";
import { lerp } from "@/lib/three/cinematic/timeline.constants";
import {
  getPageEnvironmentReveal,
  getPageEquipmentReveal,
  getPageLightingBlend,
  getHeroEquivalentProgress,
  getPageAthleteAnimationState,
} from "@/lib/three/cinematic/pageTimeline";
import {
  getAtmosphereIntensity,
  getAthleteRotation,
  getAthleteScale,
  getParticleIntensity,
  getCurrentShot,
  clampProgress,
} from "@/lib/three/cinematic/timeline";

/** Update all cinematic subsystems — pageProgress drives world, hero-equivalent drives athlete */
export function updateCinematicDirector(pageProgress: number): void {
  const p = clampProgress(pageProgress);
  const heroEq = getHeroEquivalentProgress(p);
  const store = threeMotionStore.cinematic;

  store.progress.current = heroEq;
  store.currentShot.current = getCurrentShot(heroEq).shot;

  const lighting = getPageLightingBlend(p);
  const fromPreset = LIGHTING_PRESETS[lighting.from];
  const toPreset = LIGHTING_PRESETS[lighting.to];
  const lt = lighting.blend;

  threeMotionStore.lighting.ambient.current = lerp(
    fromPreset.ambient.intensity,
    toPreset.ambient.intensity,
    lt,
  );
  threeMotionStore.lighting.key.current = lerp(
    fromPreset.key.intensity,
    toPreset.key.intensity,
    lt,
  );
  threeMotionStore.lighting.rim.current = lerp(
    fromPreset.rim.intensity,
    toPreset.rim.intensity,
    lt,
  );
  const fromFill = fromPreset.fill?.intensity ?? 0;
  const toFill = toPreset.fill?.intensity ?? 0;
  threeMotionStore.lighting.fill.current = lerp(fromFill, toFill, lt);

  threeMotionStore.environment.current = getPageEnvironmentReveal(p);
  store.equipmentReveal.current = getPageEquipmentReveal(p);
  store.atmosphereIntensity.current = getAtmosphereIntensity(heroEq);
  store.particleIntensity.current = getParticleIntensity(heroEq);
  store.athleteRotation.current = getAthleteRotation(heroEq);
  store.athleteScale.current = getAthleteScale(heroEq);

  const nextAnim = getPageAthleteAnimationState(p);
  if (store.athleteAnimation.current !== nextAnim) {
    store.athleteAnimation.current = nextAnim;
    store.animationChanged.current = true;
  } else {
    store.animationChanged.current = false;
  }

  processCinematicEvents(heroEq);
}

/** Reset animation-changed flag after controller consumes it */
export function consumeAnimationChange(): boolean {
  const changed = threeMotionStore.cinematic.animationChanged.current;
  threeMotionStore.cinematic.animationChanged.current = false;
  return changed;
}
