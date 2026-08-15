#!/usr/bin/env node
/**
 * Generates procedural GLB/HDR placeholder assets with real animation clips.
 * Run: npm run assets:generate
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

/** GLTFExporter expects FileReader in Node — must fire onloadend */
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        this.onload?.({ target: { result: buf } });
        this.onloadend?.({ target: { result: buf } });
      });
    }
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function ensureDir(rel) {
  const full = join(publicDir, rel);
  mkdirSync(dirname(full), { recursive: true });
  return full;
}

function darkMetal() {
  return new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.75,
    roughness: 0.35,
  });
}

function rubber() {
  return new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.05,
    roughness: 0.92,
  });
}

function skin() {
  return new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.06,
    roughness: 0.78,
  });
}

function concrete() {
  return new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.04,
    roughness: 0.88,
  });
}

function exportGlb(scene, animations, outPath) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (data) => {
        writeFileSync(outPath, Buffer.from(data));
        resolve();
      },
      (err) => reject(err),
      { binary: true, animations },
    );
  });
}

function buildAthlete() {
  const root = new THREE.Group();
  root.name = "Athlete";

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.8, 8, 16), skin());
  torso.name = "Torso";
  torso.position.y = 1.2;
  torso.castShadow = true;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), skin());
  head.name = "Head";
  head.position.y = 2.05;
  head.castShadow = true;

  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 6, 10), skin());
  armL.name = "ArmL";
  armL.position.set(-0.55, 1.35, 0);
  armL.rotation.z = 0.3;

  const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 6, 10), skin());
  armR.name = "ArmR";
  armR.position.set(0.55, 1.35, 0);
  armR.rotation.z = -0.3;

  const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.6, 6, 10), skin());
  legL.name = "LegL";
  legL.position.set(-0.2, 0.45, 0);

  const legR = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.6, 6, 10), skin());
  legR.name = "LegR";
  legR.position.set(0.2, 0.45, 0);

  root.add(torso, head, armL, armR, legL, legR);

  const times = [0, 1, 2];
  const breathing = new THREE.AnimationClip("breathing", 2, [
    new THREE.VectorKeyframeTrack(
      "Torso.position",
      times,
      [1.2, 1.2, 0, 1.24, 1.2, 0, 1.2, 1.2, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "Torso.scale",
      times,
      [1, 1, 1, 1.03, 1.02, 1, 1, 1, 1],
    ),
  ]);

  const idle = new THREE.AnimationClip("idle", 3, [
    new THREE.QuaternionKeyframeTrack(
      "ArmL.quaternion",
      [0, 1.5, 3],
      [
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.3)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.22)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.3)).toArray(),
      ],
    ),
    new THREE.QuaternionKeyframeTrack(
      "ArmR.quaternion",
      [0, 1.5, 3],
      [
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.3)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.22)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.3)).toArray(),
      ],
    ),
  ]);

  const walk = new THREE.AnimationClip("walk", 1.2, [
    new THREE.VectorKeyframeTrack(
      "LegL.position",
      [0, 0.3, 0.6, 0.9, 1.2],
      [0, 0.45, 0, 0, 0.52, 0, -0.2, 0.45, 0, -0.2, 0.38, 0, -0.2, 0.45, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "LegR.position",
      [0, 0.3, 0.6, 0.9, 1.2],
      [0.2, 0.45, 0, 0.2, 0.38, 0, 0.2, 0.52, 0, 0.2, 0.45, 0, 0.2, 0.45, 0],
    ),
  ]);

  const train = new THREE.AnimationClip("train", 1.5, [
    new THREE.VectorKeyframeTrack(
      "ArmR.position",
      [0, 0.4, 0.8, 1.2, 1.5],
      [0.55, 1.35, 0, 0.7, 1.55, 0, 0.55, 1.35, 0, 0.45, 1.25, 0, 0.55, 1.35, 0],
    ),
    new THREE.QuaternionKeyframeTrack(
      "Torso.quaternion",
      [0, 0.75, 1.5],
      [
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.08, 0)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.05, 0)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.08, 0)).toArray(),
      ],
    ),
  ]);

  const pose = new THREE.AnimationClip("pose", 2, [
    new THREE.VectorKeyframeTrack(
      "ArmL.position",
      [0, 1, 2],
      [-0.55, 1.35, 0, -0.75, 1.75, 0, -0.55, 1.35, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "ArmR.position",
      [0, 1, 2],
      [0.55, 1.35, 0, 0.75, 1.75, 0, 0.55, 1.35, 0],
    ),
  ]);

  return { scene: root, animations: [idle, breathing, walk, train, pose] };
}

function boxMesh(w, h, d, mat, name) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.name = name;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function buildBarbell() {
  const g = new THREE.Group();
  g.name = "Barbell";
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 12), darkMetal());
  bar.name = "Bar";
  bar.rotation.z = Math.PI / 2;
  bar.position.y = 0.4;
  const plateL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16), darkMetal());
  plateL.name = "PlateL";
  plateL.position.set(-0.72, 0.4, 0);
  const plateR = plateL.clone();
  plateR.name = "PlateR";
  plateR.position.x = 0.72;
  g.add(bar, plateL, plateR);
  return { scene: g, animations: [] };
}

function buildSquatRack() {
  const g = new THREE.Group();
  g.name = "SquatRack";
  g.add(boxMesh(0.08, 2.2, 0.08, darkMetal(), "PostL").translateX(-0.45).translateY(1.1));
  g.add(boxMesh(0.08, 2.2, 0.08, darkMetal(), "PostR").translateX(0.45).translateY(1.1));
  g.add(boxMesh(1.1, 0.08, 0.08, darkMetal(), "Top").translateY(2.1));
  g.add(boxMesh(1.1, 0.06, 0.06, darkMetal(), "JHook").translateY(1.4));
  return { scene: g, animations: [] };
}

function buildBench() {
  const g = new THREE.Group();
  g.name = "Bench";
  g.add(boxMesh(1.2, 0.08, 0.45, rubber(), "Pad").translateY(0.42));
  g.add(boxMesh(0.08, 0.4, 0.08, darkMetal(), "LegL").translateX(-0.45).translateY(0.2));
  g.add(boxMesh(0.08, 0.4, 0.08, darkMetal(), "LegR").translateX(0.45).translateY(0.2));
  return { scene: g, animations: [] };
}

function buildPlates() {
  const g = new THREE.Group();
  g.name = "Plates";
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 20), darkMetal());
  plate.name = "Plate";
  plate.rotation.x = Math.PI / 2;
  plate.position.y = 0.12;
  g.add(plate);
  return { scene: g, animations: [] };
}

function buildDumbbell() {
  const g = new THREE.Group();
  g.name = "Dumbbell";
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 10), darkMetal());
  bar.rotation.z = Math.PI / 2;
  bar.position.y = 0.15;
  const bellL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), darkMetal());
  bellL.position.set(-0.22, 0.15, 0);
  const bellR = bellL.clone();
  bellR.position.x = 0.22;
  g.add(bar, bellL, bellR);
  return { scene: g, animations: [] };
}

function buildKettlebell() {
  const g = new THREE.Group();
  g.name = "Kettlebell";
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), darkMetal());
  bell.position.y = 0.12;
  g.add(bell);
  return { scene: g, animations: [] };
}

function buildCardio(name, bodyW, bodyH, bodyD) {
  const g = new THREE.Group();
  g.name = name;
  g.add(boxMesh(bodyW, bodyH, bodyD, darkMetal(), "Body").translateY(bodyH / 2));
  const belt = boxMesh(bodyW * 0.85, 0.02, bodyD * 0.7, rubber(), "Belt");
  belt.position.y = bodyH * 0.55;
  g.add(belt);
  const spin = new THREE.AnimationClip("belt", 2, [
    new THREE.VectorKeyframeTrack(
      "Belt.position",
      [0, 1, 2],
      [0, belt.position.y, 0, 0, belt.position.y, -0.02, 0, belt.position.y, 0],
    ),
  ]);
  return { scene: g, animations: [spin] };
}

function buildCableMachine() {
  const g = new THREE.Group();
  g.name = "CableMachine";
  g.add(boxMesh(0.6, 2.4, 0.5, darkMetal(), "Frame").translateY(1.2));
  const stack = boxMesh(0.25, 0.8, 0.2, darkMetal(), "Stack");
  stack.position.set(0, 1.4, 0.2);
  g.add(stack);
  return { scene: g, animations: [] };
}

function buildBoxingBag() {
  const g = new THREE.Group();
  g.name = "BoxingBag";
  const bag = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.2, 12), rubber());
  bag.name = "Bag";
  bag.position.y = 1.2;
  g.add(bag);
  const swing = new THREE.AnimationClip("swing", 2.5, [
    new THREE.QuaternionKeyframeTrack(
      "Bag.quaternion",
      [0, 0.625, 1.25, 1.875, 2.5],
      [
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0.12, 0, 0.08)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.1, 0, -0.06)).toArray(),
        ...new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)).toArray(),
      ],
    ),
  ]);
  return { scene: g, animations: [swing] };
}

function buildSled() {
  const g = new THREE.Group();
  g.name = "Sled";
  g.add(boxMesh(0.7, 0.4, 1.2, darkMetal(), "SledBody").translateY(0.35));
  return { scene: g, animations: [] };
}

function buildFloor() {
  const g = new THREE.Group();
  g.name = "GymFloor";
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), rubber());
  floor.name = "Floor";
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  g.add(floor);
  return { scene: g, animations: [] };
}

function buildWalls() {
  const g = new THREE.Group();
  g.name = "GymWalls";
  const back = new THREE.Mesh(new THREE.PlaneGeometry(24, 7), concrete());
  back.name = "BackWall";
  back.position.set(0, 3.2, -9);
  const left = new THREE.Mesh(new THREE.PlaneGeometry(18, 7), concrete());
  left.name = "LeftWall";
  left.position.set(-11, 3.2, -2);
  left.rotation.y = Math.PI / 2;
  g.add(back, left);
  return { scene: g, animations: [] };
}

function buildSimpleEnv(name, w, h, d) {
  const g = new THREE.Group();
  g.name = name;
  g.add(boxMesh(w, h, d, concrete(), name));
  return { scene: g, animations: [] };
}

function writeMinimalHdr() {
  /* HDR skipped — procedural lighting used when absent */
}

const ASSETS = [
  ["models/characters/athlete.glb", buildAthlete],
  ["models/equipment/barbell.glb", buildBarbell],
  ["models/equipment/squat-rack.glb", buildSquatRack],
  ["models/equipment/bench.glb", buildBench],
  ["models/equipment/plates.glb", buildPlates],
  ["models/equipment/dumbbell.glb", buildDumbbell],
  ["models/equipment/kettlebell.glb", buildKettlebell],
  ["models/equipment/treadmill.glb", () => buildCardio("Treadmill", 0.8, 0.5, 1.8)],
  ["models/equipment/rower.glb", () => buildCardio("Rower", 0.5, 0.35, 1.6)],
  ["models/equipment/bike.glb", () => buildCardio("Bike", 0.4, 0.6, 1.0)],
  ["models/equipment/cable-machine.glb", buildCableMachine],
  ["models/equipment/sled.glb", buildSled],
  ["models/equipment/boxing-bag.glb", buildBoxingBag],
  ["models/environment/gym-floor.glb", buildFloor],
  ["models/environment/gym-walls.glb", buildWalls],
  ["models/environment/gym-ceiling.glb", () => buildSimpleEnv("Ceiling", 24, 0.2, 18)],
  ["models/environment/gym-pillars.glb", () => buildSimpleEnv("Pillar", 0.4, 3, 0.4)],
  ["models/environment/gym-mirrors.glb", () => buildSimpleEnv("Mirror", 4, 2.5, 0.05)],
  ["models/environment/gym-doors.glb", () => buildSimpleEnv("Door", 1.2, 2.4, 0.1)],
  ["models/environment/gym-windows.glb", () => buildSimpleEnv("Window", 2, 1.5, 0.05)],
  ["models/environment/gym-lighting-fixtures.glb", () => buildSimpleEnv("Light", 1.5, 0.15, 0.3)],
];

async function main() {
  console.log("[forge] generating procedural GLB assets...");
  let count = 0;
  for (const [rel, builder] of ASSETS) {
    const out = ensureDir(rel);
    const { scene, animations } = builder();
    await exportGlb(scene, animations, out);
    count++;
    console.log(`[forge] generated ${rel}${animations.length ? ` (${animations.length} clips)` : ""}`);
  }
  console.log(`[forge] procedural GLB complete: ${count} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
