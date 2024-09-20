import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { Block } from './Block';
import { CoinList } from './CoinList';
import { Enemy } from './Enemy/Enemy';

const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function BlockFloor() {
  return (
    <RigidBody type="fixed" friction={2}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        scale={[40, 0.2, 40]}
      />
    </RigidBody>
  );
}

export function Level() {
  return (
    <>
      <Block position={new THREE.Vector3(0, 0, 2)} />
      <Enemy debug={false} position={new THREE.Vector3(8, 0.5, 2)} />
      <CoinList />
      <BlockFloor />
    </>
  );
}
