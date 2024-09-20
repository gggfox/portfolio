import { DebugDrawLines } from './EnemyDebugger';
import * as THREE from 'three';
import { ENEMY_STATES, EnemyState, MAX_TOI, SPEED } from './EnemyVariables';
import { DIRECTION_STEP } from './Enemy';
import { RapierContext, RapierRay, RapierRigidBody, RapierWorld } from '../types/rapier.types';

export function enemyFrame(
  rigidBody: React.RefObject<RapierRigidBody>,
  search: THREE.Vector3[],
  rapier: RapierContext,
  world: RapierWorld,
  rayLines: React.RefObject<THREE.Line[]>,
  rayOriginRefs: React.MutableRefObject<THREE.Mesh[]>,
  rayDirectionRefs: React.MutableRefObject<THREE.Mesh[]>,
  scene: THREE.Scene,
  enemyState: React.MutableRefObject<EnemyState>,
  materialRef: React.MutableRefObject<THREE.MeshStandardMaterial>,
  hitbox: React.MutableRefObject<RapierRigidBody>,
  debug: boolean
) {
  if (!rigidBody.current) return;

  if (enemyState.current.state === ENEMY_STATES.DEAD) {
    materialRef.current.color.set('black');

    return;
  }
  const enemyPosition = rigidBody.current.translation();

  search.forEach((direction: THREE.Vector3, index: number) => {
    const rayOrigin = new rapier.Vector3(
      enemyPosition.x + Math.cos(index * DIRECTION_STEP),
      0.5,
      enemyPosition.z + Math.sin(index * DIRECTION_STEP)
    );
    const rayDirection = new rapier.Vector3(direction.x, direction.y, direction.z); // Replace with your direction
    const ray: RapierRay = new rapier.Ray(rayOrigin, rayDirection);
    const solid = true; // Whether to consider only solid objects
    const intersection = world.castRay(ray, MAX_TOI, solid) as any;

    if (debug) {
      DebugDrawLines(
        index,
        rayOrigin,
        rayDirection,
        rayLines,
        rayOriginRefs,
        rayDirectionRefs,
        scene
      );
    }
    if (intersection) {
      const userData = intersection.collider._parent.userData;
      if (userData && userData.name == 'player') {
        enemyState.current = { state: ENEMY_STATES.ATTACK, updatedAt: new Date().getTime() };
        materialRef.current.color.set('red');
        const linearVelocity = { x: direction.x * SPEED, y: 0, z: direction.z * SPEED };
        rigidBody.current.setLinvel(linearVelocity, true);
      }
    } else {
      if (
        enemyState.current.state == ENEMY_STATES.ATTACK &&
        new Date().getTime() - enemyState.current.updatedAt > 500
      ) {
        enemyState.current = { state: ENEMY_STATES.IDLE, updatedAt: new Date().getTime() };
        materialRef.current.color.set('blue');
      }
    }
    //console.log(rigidBody.current.);

    if (enemyState.current) {
      //console.log(enemyState);
    }

    if (hitbox && hitbox.current) {
      hitbox.current.setTranslation(
        {
          x: rigidBody.current.translation().x,
          y: rigidBody.current.translation().y + 0.55,
          z: rigidBody.current.translation().z,
        },
        true
      );
    }
  });
}
