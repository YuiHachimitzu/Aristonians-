import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function ParticleField({ count = 200, mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const hoverRef = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Soft pastel colors (purple, gold, blue tints)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Purple tint
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.96;
      } else if (colorChoice < 0.66) {
        // Gold tint
        colors[i * 3] = 0.83;
        colors[i * 3 + 1] = 0.69;
        colors[i * 3 + 2] = 0.22;
      } else {
        // Blue tint
        colors[i * 3] = 0.23;
        colors[i * 3 + 1] = 0.51;
        colors[i * 3 + 2] = 0.96;
      }

    }

    return [positions, colors];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth mouse following
    hoverRef.current.x += (mousePosition.current.x * 0.5 - hoverRef.current.x) * 0.05;
    hoverRef.current.y += (mousePosition.current.y * 0.5 - hoverRef.current.y) * 0.05;

    // Gentle floating animation
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x = hoverRef.current.y * 0.1;
    meshRef.current.rotation.z = hoverRef.current.x * 0.05;

    // Update positions for parallax effect
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Subtle wave motion
      posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingBokeh({ count = 50, mousePosition }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      color: ['#8b5cf6', '#d4af37', '#3b82f6'][Math.floor(Math.random() * 3)],
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      // Floating motion
      child.position.y = orb.position[1] + Math.sin(time * orb.speed + orb.phase) * 0.5;
      child.position.x = orb.position[0] + Math.cos(time * orb.speed * 0.7 + orb.phase) * 0.3;
      
      // Mouse parallax
      child.position.x += mousePosition.current.x * 0.3 * (i % 3 + 1) * 0.1;
      child.position.y += mousePosition.current.y * 0.3 * (i % 3 + 1) * 0.1;

      // Pulsing scale
      const scale = orb.scale * (1 + Math.sin(time * 2 + orb.phase) * 0.1);
      child.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb) => (
        <mesh key={orb.id} position={orb.position}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function StarFieldBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div 
      className="canvas-container"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={150} mousePosition={mousePosition} />
        <FloatingBokeh count={30} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
