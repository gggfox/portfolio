import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { Controls } from './Experience';
import { RapierRigidBody, RapierVector3 } from './types/rapier.types';
import { Vector3 } from '@dimforge/rapier3d-compat';

interface PlayerProps {
  startingPosition?: [number, number, number];
}

export default function Player({ startingPosition = [0, 1, 0] }: PlayerProps) {
  const body = useRef<RapierRigidBody | null>(null);
  const forward = useKeyboardControls<Controls>((state) => state.forward);
  const back = useKeyboardControls<Controls>((state) => state.back);
  const left = useKeyboardControls<Controls>((state) => state.left);
  const right = useKeyboardControls<Controls>((state) => state.right);
  const jump = useKeyboardControls<Controls>((state) => state.jump);
  const { rapier, world } = useRapier();

  const container = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const cameraTarget = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const cameraPosition = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const character = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const cameraWorldPosition = useRef(new THREE.Vector3());
  const cmaeraLookAtWorldPosition = useRef(new THREE.Vector3());
  const cameraLookAt = useRef(new THREE.Vector3());

  const MAX_VELOCITY = 3;
  const isOnFloor = useRef(true);

  useFrame((state, delta) => {
    if (!body.current) return;
    const impulse: RapierVector3 = { x: 0, y: 0, z: 0 };

    const impulseStrength = 30.6 * delta;

    const linvel = body.current.linvel();

    if (forward && linvel.z > -MAX_VELOCITY) {
      impulse.z -= impulseStrength;
    }
    if (back && linvel.z < MAX_VELOCITY) {
      impulse.z += impulseStrength;
    }
    if (left && linvel.x > -MAX_VELOCITY) {
      impulse.x -= impulseStrength;
    }
    if (right && linvel.x < MAX_VELOCITY) {
      impulse.x += impulseStrength;
    }

    if (body.current.translation().y < -10) {
      body.current.setTranslation(new Vector3(...startingPosition), true);
    }

    // jump
    const ray = world.castRay(
      new rapier.Ray(body.current.translation(), { x: 0, y: -2, z: 0 }),
      10,
      false
    );
    const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <= 1;
    if (jump && grounded) {
      body.current.setLinvel({ x: 0, y: 4, z: 0 }, true);
    }

    body.current.applyImpulse(impulse, true);

    // camera
    // cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    // state.camera.position.lerp(cameraWorldPosition.current, 0.1);

    // if (cameraTarget.current) {
    //   cameraTarget.current.getWorldPosition(cmaeraLookAtWorldPosition.current);
    //   cameraLookAt.current.lerp(cmaeraLookAtWorldPosition.current, 0.1);

    //   state.camera.lookAt(cameraLookAt.current);
    // }
  });

  return (
    <RigidBody
      name="player"
      ref={body}
      colliders={false}
      restitution={0.2}
      friction={1}
      position={startingPosition}
      canSleep={false}
      mass={1}
      type="dynamic"
      userData={{ name: 'player' }}
      enabledRotations={[false, false, false]}
      onCollisionEnter={() => {
        isOnFloor.current = true;
      }}
    >
      <CapsuleCollider args={[0.75, 0.5]} />

      <group ref={container}>
        <group ref={cameraTarget} position-z={-1.5} />
        <group ref={cameraPosition} position-y={10} position-z={10} />
        <group ref={character}>
          <mesh castShadow>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial flatShading color="mediumpurple" />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
}
