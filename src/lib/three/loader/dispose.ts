import * as THREE from "three";

export function disposeObject3D(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat) disposeMaterial(mat);
      });
    }
  });
}

export function disposeMaterial(material: THREE.Material): void {
  const mat = material as THREE.MeshStandardMaterial;
  const maps = [
    mat.map,
    mat.normalMap,
    mat.roughnessMap,
    mat.metalnessMap,
    mat.aoMap,
    mat.emissiveMap,
  ];

  maps.forEach((tex) => tex?.dispose());
  material.dispose();
}

export function disposeGLTFScene(scene: THREE.Object3D): void {
  disposeObject3D(scene);
}
