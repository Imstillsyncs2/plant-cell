import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh } from "three";

// Define props type
interface OrganelleProps {
  name: string;
  position: [number, number, number];
  color: string;
  onClick: (name: string) => void;
}

export default function Organelle({ name, position, color, onClick }: OrganelleProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.3, 32, 32]}
      position={position}
      onClick={() => onClick(name)}
      castShadow
    >
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}
