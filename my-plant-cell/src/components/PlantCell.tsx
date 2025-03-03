import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SoftShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import Loader from "./Loader";
import Organelle from "./Organelle";

const organellesData: Record<string, { description: string; image: string }> = {
  Nucleus: { description: "Control center of the cell containing DNA.", image: "/images/nucleus.png" },
  Mitochondrion: { description: "Generates energy (ATP) for the cell.", image: "/images/mitochondrion.png" },
  Chloroplast: { description: "Site of photosynthesis, converts sunlight into energy.", image: "/images/chloroplast.png" },
  Vacuole: { description: "Stores water, nutrients, and waste products.", image: "/images/vacuole.png" },
  GolgiApparatus: { description: "Packages and modifies proteins.", image: "/images/golgi.png" },
  RoughER: { description: "Studded with ribosomes, helps in protein synthesis.", image: "/images/rough_er.png" },
  SmoothER: { description: "Involved in lipid synthesis and detoxification.", image: "/images/smooth_er.png" },
  Ribosomes: { description: "Produces proteins essential for cell function.", image: "/images/ribosomes.png" },
  Peroxisome: { description: "Breaks down fatty acids and toxins.", image: "/images/peroxisome.png" },
  CellWall: { description: "Provides structural support and protection.", image: "/images/cell_wall.png" },
  PlasmaMembrane: { description: "Controls movement of materials in and out.", image: "/images/plasma_membrane.png" },
  Cytoplasm: { description: "Gel-like fluid where all organelles are suspended.", image: "/images/cytoplasm.png" },
  Plasmodesmata: { description: "Channels that allow transport between plant cells.", image: "/images/plasmodesmata.png" },
  Lysosome: { description: "Breaks down waste and unwanted materials.", image: "/images/lysosome.png" },
};

export default function PlantCell() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
  const [showOrganelles, setShowOrganelles] = useState(true);

  const organelles: { name: string; position: [number, number, number]; color: string }[] =
    Object.keys(organellesData).map((name, index) => ({
      name,
      position: [Math.sin(index) * 2, Math.cos(index) * 1.5, Math.sin(index) * -2] as [number, number, number],
      color: `hsl(${index * 30}, 100%, 60%)`,
    }));

  return (
    <>
      <button className="toggle-btn" onClick={() => setShowOrganelles(!showOrganelles)}>
        {showOrganelles ? "Hide" : "Show"} Organelles
      </button>

      <Canvas shadows camera={{ position: [0, 3, 8], fov: 50 }} style={{ background: "black" }}>
        <Suspense fallback={<Loader />}>
          <SoftShadows size={30} samples={10} focus={0.97} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <OrbitControls />

          {showOrganelles &&
            organelles.map((organelle) => (
              <Organelle key={organelle.name} {...organelle} onClick={setSelectedOrganelle} />
            ))}
        </Suspense>
      </Canvas>

      {selectedOrganelle && organellesData[selectedOrganelle] && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="info-box"
        >
          <h2>{selectedOrganelle}</h2>
          <p>{organellesData[selectedOrganelle].description}</p>
        </motion.div>
      )}
    </>
  );
}
