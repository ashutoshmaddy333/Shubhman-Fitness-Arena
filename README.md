# Shubhman Fitness Arena

Premium cinematic fitness platform built with Next.js, React Three Fiber, GSAP, and Lenis.

## Run

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

---

## FORGE Motion System

All animation flows through a single motion architecture. Import from `@/components/motion`.

### Motion Tokens

Centralized in `src/lib/motion/tokens.ts`:

- **Durations**: `instant`, `fast`, `normal`, `slow`, `cinematic`
- **Easings**: `standard`, `smooth`, `cinematic`, `expo`, `power`
- **Distances**: `xs` → `xl`
- **Stagger**, **opacity**, **scale**, **blur**, **parallax** presets
- **Magnetic**, **cursor**, **page transition**, **scroll** constants

Never scatter magic numbers in components.

### Text Animation

| Component | Use Case |
|-----------|----------|
| `SplitText` | Accessible word/line/char splitting (SSR-safe) |
| `RevealText` | Block reveal on scroll |
| `MaskText` | Clip-path editorial reveal |
| `LineReveal` | Multi-line stagger |
| `WordReveal` | Word stagger (default) |
| `CharacterReveal` | Hero/editorial only |

Presets in `src/lib/motion/textPresets.ts`.

### Image Animation

| Component | Effect |
|-----------|--------|
| `ImageReveal` | Opacity + translate |
| `ImageMaskReveal` | Clip-path reveal |
| `ImageScaleReveal` | Scale + opacity |
| `ImageParallax` | Scroll parallax |

### Video Animation (layer only)

| Component | Effect |
|-----------|--------|
| `VideoReveal` | Scale fade-in |
| `VideoParallax` | Scroll parallax |
| `VideoScaleReveal` | Cinematic scale |

No video assets loaded — animation wrappers only.

### Hooks

| Hook | Purpose |
|------|---------|
| `useReveal` | Generic scroll reveal |
| `useParallax` | Controlled parallax (ref-based) |
| `useScrollAnimation` | Custom from/to scroll animation |
| `useSectionProgress` | Section 0→1 progress ref (no state) |
| `useMagnetic` | Pointer magnetic effect |
| `useHoverMotion` | Consistent hover presets |
| `useThreeObjectMotion` | 3D object scroll registration |

### Parallax

```tsx
<Parallax strength={0.15}>
  <img ... />
</Parallax>
```

Disabled under reduced motion and LOW performance tier.

### Magnetic Interactions

```tsx
<MagneticButton strength={0.35} radius={120}>
  Start Your Journey
</MagneticButton>
```

Uses GSAP + refs. Disabled on touch and reduced motion.

### Hover Motion

```tsx
<HoverMotion preset="card" cursor="view">
  ...
</HoverMotion>
```

Presets: `lift`, `scale`, `glow`, `underline`, `image`, `card`.

### Cursor States

Use `data-cursor` attribute:

| Value | Label |
|-------|-------|
| `hover` | Expand ring |
| `view` | VIEW |
| `play` | PLAY |
| `drag` | DRAG |
| `external` | OPEN |
| `explore` | EXPLORE |

Ref-based rAF — no React state on mousemove.

### Page Transitions

`PageTransition` wraps app content in `AppProviders`. On route change:

1. Clip-path overlay rises
2. FORGE® typography flash
3. Content fades in

Skipped under reduced motion.

### 3D Motion Architecture

```
ScrollProgressProvider
  └── heroProgress ref → threeMotionStore
        └── CameraRig → cameraController
        └── useThreeObjectMotion(id) → object registry
```

- `src/lib/three/threeMotionStore.ts` — ref-based 3D state
- `src/lib/three/cameraController.ts` — declarative camera resolution
- Camera states: `HERO_FAR`, `HERO_CLOSE`, `ATHLETE_PROFILE`, `ATHLETE_ORBIT`, `GYM_ENTRY`, `FINAL`

### Reduced Motion

All motion integrates with `ReducedMotionProvider`:

- Instant visibility instead of animation
- No parallax, magnetic, or cursor animation
- Static 3D camera at `HERO_FAR`
- Lenis disabled

### Cleanup Rules

1. Always use `createMotionContext()` or `gsap.context()`
2. Return revert function from `useEffect`
3. Never `setState` in rAF or scroll callbacks
4. Use refs for 0→1 progress values
5. Remove event listeners in cleanup

---

## 3D Asset Pipeline (Phase 3)

Production architecture for GLB/GLTF assets, materials, lighting, and performance tiers. No final gym environment yet — placeholders remain until real assets are added.

### Asset Structure

```
public/
  models/characters|equipment|environment|props/
  textures/characters|equipment|environment|props/
  hdr/studio|gym|dark/
  animations/
  images/fallback/
  videos/
```

Paths are centralized in `src/lib/three/assets/paths.ts`.

### Asset Registry

Typed registry in `src/lib/three/assets/registry.ts`:

- `assetRegistry.characters` — hero athlete
- `assetRegistry.equipment` — barbell, dumbbell, bench, etc.
- `assetRegistry.environments` — modular floor/walls
- `assetRegistry.props` — decorative objects
- `assetRegistry.hdr` — studio, dark gym, dramatic gym, neutral

Each entry includes `id`, `path`, `available`, `bounds`, `preload`, `tier`, and metadata. Set `available: true` when a GLB/HDR file is added — until then, fallbacks render automatically.

### Model Loading

| Component | Purpose |
|-----------|---------|
| `ModelLoader` | Generic GLTF/GLB loader with Suspense |
| `ModelInstance` | Registry-aware instance + error boundary |
| `ModelErrorBoundary` | Per-model failure isolation |

Loader utilities in `src/lib/three/loader/`:

- `modelCache.ts` — caching, `preloadModel()`, `preloadAsset()`
- `preload.ts` — `preloadHeroAssets()`, `preloadEnvironment()`
- `dispose.ts` — geometry/material/texture cleanup

### Asset Components

| Component | Purpose |
|-----------|---------|
| `CharacterModel` | Hero athlete with animation controller |
| `EquipmentModel` | Strength/cardio/recovery equipment |
| `EnvironmentModel` | Modular architecture pieces |
| `EnvironmentLighting` | HDR environment switching |
| `InstancedGroup` | Repeated static objects |

### Character Animation

`CharacterAnimationController` supports `play`, `pause`, `stop`, `crossfade`, `setWeight`, `setTimeScale` with states: `IDLE`, `WALK`, `TRAIN`, `POSE`. Clip names are mapped in the registry — no fake rotation animation when real clips exist.

### Materials

- `src/lib/three/materials/presets.ts` — PBR presets (metal, rubber, concrete, glass, wood, fabric, skin, plastic)
- `src/lib/three/materials/forgeMaterials.ts` — brand presets (`ForgeMetal`, `ForgeRubber`, etc.)
- `configureTexture()` — color space, mipmaps, anisotropy

### Lighting

Presets in `src/lib/three/lighting/presets.ts`: `DARK`, `STUDIO`, `DRAMATIC`, `TRAINING`, `RECOVERY`, `HERO`. Scene presets map via `SCENE_PRESET_MAP`. Shadow config per tier in `shadowConfig.ts`.

### Performance Tiers

`src/lib/three/performance/tierConfig.ts` controls DPR, shadows, HDR, instancing, texture limits, and LOD bias for `HIGH` / `MEDIUM` / `LOW`. `ForgeCanvas` reads tier config; reduced motion downgrades HIGH → MEDIUM.

### LOD & Instancing

- `src/lib/three/lod/config.ts` — `selectLODLevel()` for LOD0/LOD1/LOD2
- `InstancedGroup` — tier-gated instanced meshes for repeated props

### Fallback Hierarchy

```
GLB model → PlaceholderObject → null (equipment/env)
```

Failures are caught by `ModelErrorBoundary` + `SceneErrorBoundary` — the Canvas never crashes.

### Debugging

Set `NEXT_PUBLIC_FORGE_DEBUG=false` to disable dev overlays.

- `ForgeDebugStats` — in-canvas FPS (drei Stats)
- `ForgeDebugPanel` — loaded model paths

### Adding a Real Asset

1. Place GLB in `public/models/<category>/`
2. Set `available: true` in `registry.ts`
3. Optionally set `preload: true` for hero-critical assets
4. Component picks it up automatically — no path changes in scene code

### Camera Integration

Registry `bounds` provide `center`, `recommendedCameraDistance`, and `recommendedLookAt`. Use `getAssetCameraHints(assetId)`.

Build-time manifest (`npm run assets:manifest`) scans `public/` and sets availability — no runtime network requests.

---

## Cinematic Hero (Phase 4)

Interactive cinematic hero driven by a **single scroll progress value** (`heroProgress`).

### Architecture

```
useHeroScrollTimeline (one ScrollTrigger)
  └── setHeroProgress(0→1)
        ├── CinematicDirector (camera, lighting, athlete, env, particles)
        ├── CameraRig → 9-shot choreography
        ├── HeroSection typography
        └── cinematicEvents (sound-ready)
```

### Hero Scene Composition

`ForgeHeroScene` modular layout:

| Component | Role |
|-----------|------|
| `CameraRig` | Cinematic camera + director update |
| `HeroAthlete` | Character with scroll-driven animation |
| `HeroEnvironment` | GLB environment or procedural fallback |
| `HeroEquipment` | Priority equipment with tier gating |
| `HeroAtmosphere` | Fog/haze from cinematic progress |
| `SceneLighting` | DARK → HERO → DRAMATIC → TRAINING blend |
| `Particles` | Tier-scaled dust particles |

### Cinematic Timeline

Defined in `src/lib/three/cinematic/timeline.ts`:

| Progress | Shot |
|----------|------|
| 0.00–0.10 | Establishing |
| 0.10–0.25 | Approach |
| 0.25–0.40 | Athlete Reveal |
| 0.40–0.55 | Close |
| 0.55–0.70 | Orbit |
| 0.70–0.82 | Pass By |
| 0.82–0.92 | Gym Reveal |
| 0.92–0.97 | Gym Entry |
| 0.97–1.00 | Final |

Camera keyframes: `CINEMATIC_CAMERA_STATES` in `cameraStates.ts`. Responsive offsets for desktop/tablet/mobile in `cinematic/viewport.ts`.

### Character Animation

Scroll-driven states via `getAthleteAnimationState()`: IDLE → BREATHING → TRAIN → POSE. Uses `CharacterAnimationController` with crossfade — only changes on shot transition, never restarts every frame.

### Sound-Ready Events

Subscribe via `cinematicEvents.on()`:

- `heroStart`, `athleteReveal`, `orbitStart`, `gymReveal`, `gymEntry`, `heroComplete`

### Loading

`HeroLoadingExperience` shows briefly on init while the build-time manifest initializes. No network requests.

### Debugging

- `NEXT_PUBLIC_FORGE_DEBUG=false` — disable overlays
- `NEXT_PUBLIC_FORGE_CAMERA_DEBUG=true` — show camera position/FOV/lookAt
- `CinematicDebugOverlay` — FPS, frame time, triangles, draw calls, textures, DPR, tier, cinematic progress, shot
- `ForgeDebugCollector` — in-canvas renderer stats feed

---

## Asset Production (Phase 4.5)

### Build-Time Manifest

Asset availability is **deterministic** — no runtime HEAD requests:

```bash
npm run assets:manifest   # runs automatically on dev/build
```

Generates:
- `public/asset-manifest.json`
- `src/lib/three/assets/manifest.generated.ts`

Use `isAssetAvailable(id)` from `assetAvailability.ts`.

### Asset Priority (when sourcing GLBs)

| # | File | Notes |
|---|------|-------|
| 1 | `models/characters/athlete.glb` | Rigged — idle, breathing, walk, train, pose |
| 2 | `models/environment/gym-floor.glb` | |
| 3 | `models/environment/gym-walls.glb` | |
| 4 | `models/equipment/squat-rack.glb` | Foreground |
| 5 | `models/equipment/barbell.glb` | Foreground |
| 6 | `models/equipment/bench.glb` | Midground |
| 7 | `models/equipment/plates.glb` | Foreground detail |
| 8 | `hdr/dark/gym-dark.hdr` | IBL for PBR quality |

Visual hierarchy enforced in `heroComposition.ts` — max 5 equipment (HIGH), 4 (MEDIUM), 2 (LOW). Athlete stays focal.

### Roadmap

Phase 4 ✓ → Phase 4.5 ✓ → **Phase 4.6 ✓** (visual upgrade) → Phase 5 (after real assets + polish)

---

## Environment

Optional: `NEXT_PUBLIC_SITE_URL` for canonical URLs and sitemap.
