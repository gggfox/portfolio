import { shaderMaterial } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import portalVertexShader from '@/shaders/kalydoscope/vertex.glsl';
import portalFragmentShader from '@/shaders/kalydoscope/fragment.glsl';
import { useEffect, useRef, useState } from 'react';
import classes from './NotFound404.module.css';
// Define a GLSL shader material for the gradient
const GradientMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uTime: 0,
  },
  // Vertex Shader
  portalVertexShader,
  // Fragment Shader
  portalFragmentShader
);
extend({ GradientMaterial });

const GradientPlane = () => {
  const materialRef = useRef<any>();
  const textRef = useRef<any>();

  useFrame(({ clock, viewport }, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime(); // Update uTime with the elapsed time
    }
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 3) / 2;
      console.log();
    }
  });

  return (
    // <Center ref={textRef}>
    //   <Text3D
    //     font="./fonts/helvetiker_regular.typeface.json"
    //     scale={200}
    //     bevelEnabled
    //     bevelThickness={0.02}
    //     bevelSize={0.02}
    //     bevelOffset={0}
    //     bevelSegments={5}
    //   >
    //     {`404 page\nnot found`}
    //     <gradientMaterial ref={materialRef} />
    //   </Text3D>
    // </Center>
    <mesh scale={[window.innerWidth, window.innerHeight, 1]}>
      <planeGeometry args={[2, 2, 1]} />
      <gradientMaterial ref={materialRef} />
    </mesh>
  );
};

export function NotFound404Page() {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

  useEffect(() => {
    // Prevent rendering Canvas immediately to avoid context loss issues
    setShouldRenderCanvas(true);
  }, []);

  return (
    <>
      <Canvas
        style={{ height: '90vh' }}
        flat // gets rid of tone mapping
        camera={{
          fov: 45,
          near: 0.1,
          far: 20000,
          position: [0, 0, 2000],
        }}
      >
        <ambientLight intensity={2.5} />
        <GradientPlane />
      </Canvas>
      <p className={classes.title}>404 Error Page Not Found</p>
    </>
  );
}
