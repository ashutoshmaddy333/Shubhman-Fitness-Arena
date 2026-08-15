import type { CinematicEventName } from "@/lib/three/cinematic/timeline.constants";

type CinematicListener = (event: CinematicEventName) => void;

const listeners = new Map<CinematicEventName, Set<CinematicListener>>();
const firedEvents = new Set<CinematicEventName>();

/** Sound-ready cinematic event bus — no audio engine, subscribe-only */
export const cinematicEvents = {
  on(event: CinematicEventName, listener: CinematicListener): () => void {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(listener);
    return () => listeners.get(event)?.delete(listener);
  },

  emit(event: CinematicEventName): void {
    listeners.get(event)?.forEach((fn) => fn(event));
  },

  /** Emit once when progress crosses threshold (forward scroll) */
  emitOnce(event: CinematicEventName): void {
    if (firedEvents.has(event)) return;
    firedEvents.add(event);
    this.emit(event);
  },

  reset(): void {
    firedEvents.clear();
  },

  hasFired(event: CinematicEventName): boolean {
    return firedEvents.has(event);
  },
};

/** Process cinematic progress and fire threshold events */
export function processCinematicEvents(progress: number): void {
  if (progress >= 0 && !cinematicEvents.hasFired("heroStart")) {
    cinematicEvents.emitOnce("heroStart");
  }
  if (progress >= 0.25) cinematicEvents.emitOnce("athleteReveal");
  if (progress >= 0.55) cinematicEvents.emitOnce("orbitStart");
  if (progress >= 0.82) cinematicEvents.emitOnce("gymReveal");
  if (progress >= 0.92) cinematicEvents.emitOnce("gymEntry");
  if (progress >= 0.97) cinematicEvents.emitOnce("heroComplete");
}
