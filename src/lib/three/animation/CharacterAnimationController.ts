import * as THREE from "three";
import type { AnimationState } from "@/lib/three/assets/types";

export interface AnimationControllerOptions {
  crossfadeDuration?: number;
}

/** Data-driven character animation controller using Three.js AnimationMixer */
export class CharacterAnimationController {
  private mixer: THREE.AnimationMixer;
  private actions = new Map<AnimationState, THREE.AnimationAction>();
  private current: THREE.AnimationAction | null = null;
  private currentState: AnimationState | null = null;
  private crossfadeDuration: number;

  constructor(
    root: THREE.Object3D,
    animations: THREE.AnimationClip[],
    clipMap: Partial<Record<AnimationState, string>>,
    options: AnimationControllerOptions = {},
  ) {
    this.mixer = new THREE.AnimationMixer(root);
    this.crossfadeDuration = options.crossfadeDuration ?? 0.35;

    (Object.entries(clipMap) as [AnimationState, string][]).forEach(
      ([state, clipName]) => {
        const clip = animations.find((a) => a.name === clipName);
        if (clip) {
          const action = this.mixer.clipAction(clip);
          this.actions.set(state, action);
        }
      },
    );
  }

  getMixer(): THREE.AnimationMixer {
    return this.mixer;
  }

  play(state: AnimationState, fadeIn = true): void {
    let next: THREE.AnimationAction | undefined = this.actions.get(state);

    if (!next && state !== "BREATHING") {
      next = this.actions.get("BREATHING");
    }
    if (!next && this.actions.size > 0) {
      next = this.actions.values().next().value;
    }
    if (!next) return;

    if (this.current && this.current !== next) {
      if (fadeIn) {
        this.current.crossFadeTo(next, this.crossfadeDuration, false);
      } else {
        this.current.stop();
      }
    }

    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
    this.current = next;
    this.currentState = state;
  }

  pause(): void {
    this.mixer.timeScale = 0;
  }

  resume(): void {
    this.mixer.timeScale = 1;
  }

  stop(): void {
    this.current?.stop();
    this.current = null;
    this.currentState = null;
  }

  crossfade(to: AnimationState, duration?: number): void {
    const prev = this.crossfadeDuration;
    if (duration !== undefined) this.crossfadeDuration = duration;
    this.play(to, true);
    this.crossfadeDuration = prev;
  }

  setWeight(state: AnimationState, weight: number): void {
    this.actions.get(state)?.setEffectiveWeight(weight);
  }

  setTimeScale(scale: number): void {
    this.mixer.timeScale = scale;
  }

  getCurrentState(): AnimationState | null {
    return this.currentState;
  }

  update(delta: number): void {
    this.mixer.update(delta);
  }

  dispose(): void {
    this.actions.forEach((action) => action.stop());
    this.actions.clear();
    this.mixer.stopAllAction();
  }
}
