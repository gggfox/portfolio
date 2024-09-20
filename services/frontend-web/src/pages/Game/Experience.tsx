import {
  Box,
  KeyboardControls,
  KeyboardControlsEntry,
  OrbitControls,
  meshBounds,
} from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from './Player.jsx';
import { Level } from './Level.js';
import { useMemo, useRef } from 'react';
import { Block } from './Block.js';
import { Enemy } from './Enemy/Enemy.js';
import * as THREE from 'three';
export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

function getControls() {
  return [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ];
}

const DEBUG = true;

export default function Experience() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(getControls, []);

  return (
    <>
      <OrbitControls makeDefault />

      <color args={['#bdedfc']} attach="background" />
      <KeyboardControls map={map}>
        <Physics debug={DEBUG}>
          <Player />
          <Level />
        </Physics>
      </KeyboardControls>
    </>
  );
}
