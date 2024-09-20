import { RigidBody } from '@react-three/rapier';
import { ENEMY_STATES, EnemyState } from './EnemyVariables';
import * as THREE from 'three';
import { RapierRigidBody } from '../types/rapier.types';

interface EnemyHitBoxProps {
  rigidBody: React.RefObject<RapierRigidBody>;
  position: THREE.Vector3 | [number, number, number];
  hitBox: React.RefObject<RapierRigidBody>;
  enemyState: React.MutableRefObject<EnemyState>;
}

export function EnemyHitBox({ rigidBody, position, hitBox, enemyState }: EnemyHitBoxProps) {
  return (
    <RigidBody
      type="fixed"
      sensor
      position={position}
      ref={hitBox}
      onIntersectionEnter={(e) => {
        if (e?.other?.rigidBodyObject?.name === 'player') {
          console.log('collision');
          enemyState.current = {
            state: ENEMY_STATES.DEAD,
            updatedAt: new Date().getTime(),
          };
          if (rigidBody && rigidBody.current) {
            rigidBody?.current?.setTranslation(
              {
                x: rigidBody.current.translation().x,
                y: rigidBody.current.translation().y - 100,
                z: rigidBody.current.translation().z,
              },
              true
            );
            hitBox.current.setTranslation(rigidBody.current.translation(), true);
          }
        }
      }}
    >
      <mesh>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshBasicMaterial color="pink" visible={true} />
      </mesh>
    </RigidBody>
  );
}
