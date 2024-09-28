import { meshBounds } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

const floor2Material = new THREE.MeshStandardMaterial({ color: 'red' });
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

interface BlockProps {
  position?: THREE.Vector3 | [number, number, number];
}

export function Block({ position = [-2, 0.5, 0] }: BlockProps) {
  const block = useRef<THREE.Mesh>(null!);
  return (
    <RigidBody
      type="kinematicPosition"
      friction={0}
      restitution={0.2}
      colliders="cuboid"
      userData={{ name: 'block' }}
    >
      <mesh
        ref={block}
        position={position}
        name="block"
        scale={1.5}
        receiveShadow
        raycast={meshBounds}
        geometry={boxGeometry}
        //material={floor2Material}
        //scale={[1, 1, 1]}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color={'red'} />
      </mesh>
    </RigidBody>
  );
}
