import { Layout } from '@/components/Layout';
import { Loader, MeshReflectorMaterial, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useLayoutEffect } from 'react';
import Experience from './Experience';
import { Light } from './Light';

export function GamePage() {
  //const { scene } = useGLTF('./models/hamburger.glb', false);

  // const hand = useGLTF("./models/hand.glb");
  // useEffect(() => {
  //     // Traverse through the hand model's scene and update the material color to red
  //     hand.scene.traverse((child: THREE.Mesh) => {
  //         if (child instanceof THREE.Mesh && child.material) {
  //             child.material = new THREE.MeshStandardMaterial({ color: "red" });

  //             child.material.color.set("red");
  //             console.log('hand should be red')
  //         }
  //     });
  // }, [hand]);
  return (
    <Suspense fallback={<Loader />}>
      {/* <Layout> */}
      <Canvas
        style={{ height: '90vh' }}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <color args={['#bdedfc']} attach="background" />
        <Light />

        {/* <primitive object={hand.scene} scale={2} /> */}
        <Experience />
      </Canvas>
      {/* </Layout>{' '} */}
    </Suspense>
  );
}

useGLTF.preload('./hamburger.glb');
