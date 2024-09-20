import * as THREE from 'three';
import { useEffect } from 'react';
import { MAX_TOI } from './EnemyVariables';
import { RapierVector3 } from '../types/rapier.types';

export function DebugBootloader(
  debug: boolean,
  search: THREE.Vector3[],
  rayLines: React.MutableRefObject<THREE.Line[]>,
  scene: THREE.Scene
) {
  if (!debug) return;
  useEffect(() => {
    // Create lines for each direction
    search.forEach(() => {
      const material = new THREE.LineBasicMaterial({ color: 'red' });
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1), // Placeholder for the direction
      ]);
      const line = new THREE.Line(geometry, material);
      rayLines.current.push(line);
      scene.add(line);
    });

    return () => {
      if (!rayLines.current) return;
      // Cleanup the lines on unmount
      rayLines.current.forEach((line) => scene.remove(line));
      rayLines.current = [];
    };
  }, [scene, search]);
}

export function DebugDrawLines(
  index: number,
  rayOrigin: RapierVector3,
  rayDirection: RapierVector3,
  rayLines: React.MutableRefObject<THREE.Line[]>,
  rayOriginRefs: React.MutableRefObject<THREE.Mesh[]>,
  rayDirectionRefs: React.MutableRefObject<THREE.Mesh[]>,
  scene: THREE.Scene
) {
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
  const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 'cyan' });
  const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  // Update the line to visualize the ray
  const line = rayLines.current[index];
  const points = [
    new THREE.Vector3(rayOrigin.x, rayOrigin.y, rayOrigin.z),
    new THREE.Vector3(
      rayOrigin.x + rayDirection.x * MAX_TOI,
      rayOrigin.y + rayDirection.y * MAX_TOI,
      rayOrigin.z + rayDirection.z * MAX_TOI
    ),
  ];
  line.geometry.setFromPoints(points);

  // Update ray origin and direction visualization
  if (!rayOriginRefs.current[index]) {
    const originMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    rayOriginRefs.current[index] = originMesh;
    scene.add(originMesh);
  }
  rayOriginRefs.current[index].position.set(rayOrigin.x, rayOrigin.y, rayOrigin.z);

  if (!rayDirectionRefs.current[index]) {
    const directionMesh = new THREE.Mesh(sphereGeometry, sphereMaterial2);
    rayDirectionRefs.current[index] = directionMesh;
    scene.add(directionMesh);
  }
  rayDirectionRefs.current[index].position.set(
    rayOrigin.x + rayDirection.x,
    rayOrigin.y + rayDirection.y,
    rayOrigin.z + rayDirection.z
  );
}
