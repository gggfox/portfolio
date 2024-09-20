import { useFrame, useThree } from '@react-three/fiber';
import { RapierContext, RigidBody } from '@react-three/rapier';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useRapier } from '@react-three/rapier';
import { DebugBootloader } from './EnemyDebugger';
import { enemyFrame } from './EnemyFrameLogic';
import { ENEMY_STATES, EnemyState, IDLE_MATERIAL } from './EnemyVariables';
import { EnemyHitBox } from './EnemyHitBox';
import { RapierRigidBody } from '../types/rapier.types';

interface EnemyProps {
  position?: THREE.Vector3 | [number, number, number];
  debug: boolean;
}
export const DIRECTION_STEP = 5;
function populateDirections() {
  const directions: THREE.Vector3[] = [];
  for (let i = 0; i < 360; i += DIRECTION_STEP) {
    directions.push(new THREE.Vector3(Math.cos(i), 0.0, Math.sin(i)));
  }
  return directions;
}

export function Enemy({ position = [-2, 0.5, 0], debug = false }: EnemyProps) {
  const rigidBody = useRef<RapierRigidBody>(null);
  const rapier: RapierContext = useRapier();
  const { scene } = useThree();
  const currentEnemyState = useRef<EnemyState>({
    state: ENEMY_STATES.IDLE,
    updatedAt: new Date().getTime(),
  });
  const materialRef = useRef(IDLE_MATERIAL);
  const hitBox = useRef(null);

  const search = useMemo<THREE.Vector3[]>(populateDirections, []);

  // Debugger variables
  const rayOriginRefs = useRef<THREE.Mesh[]>([]);
  const rayDirectionRefs = useRef<THREE.Mesh[]>([]);
  const rayLines = useRef<THREE.Line[]>([]);

  DebugBootloader(debug, search, rayLines, scene);

  useFrame(() =>
    enemyFrame(
      rigidBody,
      search,
      rapier.rapier,
      rapier.world,
      rayLines,
      rayOriginRefs,
      rayDirectionRefs,
      scene,
      currentEnemyState,
      materialRef,
      hitBox,
      debug
    )
  );

  return (
    <>
      <EnemyHitBox
        hitBox={hitBox}
        position={position}
        rigidBody={rigidBody}
        enemyState={currentEnemyState}
      />
      <RigidBody
        ref={rigidBody}
        position={position}
        type="dynamic"
        friction={0}
        restitution={0.2}
        userData={{ name: 'enemy' }}
        enabledRotations={[false, false, false]}
        canSleep={currentEnemyState.current.state === ENEMY_STATES.DEAD}
      >
        <mesh receiveShadow scale={[1, 1, 1]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial ref={materialRef} color="blue" />
        </mesh>
      </RigidBody>
    </>
  );
}
