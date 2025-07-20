import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  type: 'box' | 'sphere' | 'octahedron';
}

const FloatingShape = ({ position, color, type }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const ShapeComponent = {
    box: Box,
    sphere: Sphere,
    octahedron: Octahedron,
  }[type];

  return (
    <ShapeComponent ref={meshRef} position={position}>
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </ShapeComponent>
  );
};

export const FloatingShapes = () => {
  const shapes: FloatingShapeProps[] = [
    { position: [-4, 2, -2], color: '#60A5FA', type: 'box' },
    { position: [4, -1, -3], color: '#A855F7', type: 'sphere' },
    { position: [2, 3, -1], color: '#06B6D4', type: 'octahedron' },
    { position: [-3, -2, -4], color: '#EC4899', type: 'box' },
    { position: [0, 4, -2], color: '#60A5FA', type: 'sphere' },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
};