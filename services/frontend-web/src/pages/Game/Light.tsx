import { useHelper } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Light() {
  const light = useRef<THREE.DirectionalLight>(null!);
  useHelper(light, THREE.DirectionalLightHelper, 1, 'red');
  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
      {light.current && <directionalLightHelper light={light.current} />}
    </>
  );
}
