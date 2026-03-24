import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Environment } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

const MouseLight = () => {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!light.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      light.current.position.set(x * viewport.width * 0.5, y * viewport.height * 0.5, 3);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [viewport]);

  return <pointLight ref={light} intensity={80} color="#06b6d4" distance={12} />;
};

const FloatingText = ({ text }: { text: string }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef}>
      <Center>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color="#0891b2"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const Hero3DText = ({ text = "" }: { text?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-32 lg:h-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <MouseLight />
          <spotLight position={[5, 5, 5]} intensity={30} angle={0.4} penumbra={1} color="#7c3aed" />
          <FloatingText text={text} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DText;
