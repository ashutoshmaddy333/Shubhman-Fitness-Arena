import * as THREE from "three";

/** Lift very dark PBR materials so equipment reads under cinematic lighting */
export function enhanceGymMaterials(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      if (!(material instanceof THREE.MeshStandardMaterial)) return;

      material.envMapIntensity = Math.max(material.envMapIntensity, 1.15);

      const luminance =
        material.color.r * 0.2126 +
        material.color.g * 0.7152 +
        material.color.b * 0.0722;

      if (luminance < 0.08) {
        material.color.multiplyScalar(1.45);
        material.roughness = Math.min(material.roughness, 0.72);
      }

      if (material.metalness > 0.4) {
        material.metalness = Math.min(material.metalness + 0.08, 0.95);
      }
    });
  });
}
