import * as THREE from 'three';

export const SPEED = 2;
export const MAX_TOI = 6; // Maximum time of impact (length of the ray)

export enum ENEMY_STATES {
  IDLE,
  ATTACK,
  DEAD,
}

export const ATTACK_MATERIAL = new THREE.MeshStandardMaterial({ color: 'pink' });
export const IDLE_MATERIAL = new THREE.MeshStandardMaterial({ color: 'gray' });

export interface EnemyState {
  state: ENEMY_STATES;
  updatedAt: number;
}
