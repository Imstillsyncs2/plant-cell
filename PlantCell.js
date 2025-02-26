import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Billboard, useTexture } from "@react-three/drei";

// Animation hook for floating movement
const Floating = ({ children, speed = 0.5, range = 0.2 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime() * speed) * range;
  });
  return <group ref={ref}>{children}</group>;
};

const PlantCell = () => {
  // Load textures
  const nucleusTexture = useTexture("/textures/nucleus.jpg");
  const chloroplastTexture = useTexture("/textures/chloroplast.jpg");
  const mitochondriaTexture = useTexture("/textures/mitochondria.jpg");

  return (
    <Canvas camera={{ position: [0, 5, 12] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />

      {/* Cell Wall */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7, 7, 7]} />
        <meshStandardMaterial color="lightgreen" wireframe />
      </mesh>

      {/* Cell Membrane */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshStandardMaterial color="green" transparent opacity={0.5} />
      </mesh>

      {/* Cytoplasm */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.4, 32, 32]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.3} />
      </mesh>

      {/* Nucleus */}
      <Floating>
        <mesh position={[0, 0, 1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={nucleusTexture} />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Nucleus</Text>
        </Billboard>
      </Floating>

      {/* Nucleolus */}
      <Floating speed={0.7}>
        <mesh position={[0, 0, 1.3]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="pink" />
        </mesh>
        <Billboard>
          <Text fontSize={0.4} color="black">Nucleolus</Text>
        </Billboard>
      </Floating>

      {/* Vacuole */}
      <Floating speed={0.3}>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="blue" transparent opacity={0.5} />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Vacuole</Text>
        </Billboard>
      </Floating>

      {/* Chloroplasts */}
      <Floating>
        <mesh position={[-2, -1, 1]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial map={chloroplastTexture} />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Chloroplast</Text>
        </Billboard>
      </Floating>

      {/* Mitochondria */}
      <Floating>
        <mesh position={[1.5, -1.5, -1]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial map={mitochondriaTexture} />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Mitochondrion</Text>
        </Billboard>
      </Floating>

      {/* Golgi Apparatus */}
      <Floating speed={0.4}>
        <mesh position={[-1, 1, 0]}>
          <boxGeometry args={[1, 0.5, 1.5]} />
          <meshStandardMaterial color="brown" />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Golgi Apparatus</Text>
        </Billboard>
      </Floating>

      {/* Rough Endoplasmic Reticulum */}
      <Floating>
        <mesh position={[0.5, 1, 1]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <Billboard>
          <Text fontSize={0.4} color="black">Rough ER</Text>
        </Billboard>
      </Floating>

      {/* Smooth Endoplasmic Reticulum */}
      <Floating>
        <mesh position={[0.5, 1, -1]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
          <meshStandardMaterial color="lightcoral" />
        </mesh>
        <Billboard>
          <Text fontSize={0.4} color="black">Smooth ER</Text>
        </Billboard>
      </Floating>

      {/* Ribosomes */}
      <Floating>
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        <Billboard>
          <Text fontSize={0.4} color="black">Ribosomes</Text>
        </Billboard>
      </Floating>

      {/* Peroxisome */}
      <Floating>
        <mesh position={[-1.5, 0, -1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
        <Billboard>
          <Text fontSize={0.5} color="black">Peroxisome</Text>
        </Billboard>
      </Floating>
    </Canvas>
  );
};

export default PlantCell;
