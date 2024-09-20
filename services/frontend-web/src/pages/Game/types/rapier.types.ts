import * as RAPIER from '@react-three/rapier';
import { World, Ray, Vector3 } from '@dimforge/rapier3d-compat';
import type Rapier from '@dimforge/rapier3d-compat';

export type RapierRigidBody = RAPIER.RapierRigidBody;
export type RapierWorld = World;
export type RapierContext = typeof Rapier;
export type RapierRay = Ray;
export type RapierVector3 = Vector3;
