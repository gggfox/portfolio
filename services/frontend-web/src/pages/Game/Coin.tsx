import { RootState, useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const floor2Material = new THREE.MeshStandardMaterial({ color: 'cyan' });
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.2);

function handlePlayerCollision(
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  name?: string
) {
  if (name === 'player') {
    setVisible(false);
  }
}

function coinFrame(
  state: RootState,
  coinRef: React.MutableRefObject<any>,
  visible: boolean,
  meshRef: React.MutableRefObject<THREE.Mesh>
) {
  if (!coinRef.current || !visible) {
    return;
  }
  const time = state.clock.getElapsedTime();
  meshRef.current.rotation.y = time;
}

interface CoinProps {
  position: THREE.Vector3 | [number, number, number];
}

export function Coin({ position }: CoinProps) {
  const coinRef = useRef<RapierRigidBody>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [visible, setVisible] = useState(true);

  useFrame((state, delta) => coinFrame(state, coinRef, visible, meshRef));

  return (
    <>
      {visible && (
        <RigidBody
          type="kinematicPosition"
          name="coin"
          sensor
          ref={coinRef}
          friction={0}
          restitution={0.2}
          onIntersectionEnter={(payload) => {
            handlePlayerCollision(setVisible, payload?.rigidBodyObject?.name);
          }}
        >
          <mesh
            ref={meshRef}
            position={position}
            receiveShadow
            geometry={boxGeometry}
            material={floor2Material}
            scale={[1, 1, 1]}
            castShadow
          />
        </RigidBody>
      )}
    </>
  );
}
