import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

/** Tonos vivos de la paleta (lavanda, rosa, menta y verde grisáceo). */
const VIVO = {
  lavanda: "#7b93ff",
  rosa: "#ff86a6",
  menta: "#3fddae",
  teal: "#46b8a9",
} as const;

type Forma = {
  tipo: "icosaedro" | "toro" | "esfera" | "octaedro";
  posicion: [number, number, number];
  escala: number;
  color: string;
  velocidad: number;
};

const FORMAS: Forma[] = [
  { tipo: "icosaedro", posicion: [-0.9, 0.6, 0], escala: 1.2, color: VIVO.lavanda, velocidad: 1 },
  { tipo: "toro", posicion: [1.4, -0.9, 0.4], escala: 0.9, color: VIVO.rosa, velocidad: 0.9 },
  { tipo: "esfera", posicion: [1.6, 1.6, -0.5], escala: 0.65, color: VIVO.menta, velocidad: 1.3 },
  { tipo: "octaedro", posicion: [-1.9, -1.5, 0.2], escala: 0.8, color: VIVO.teal, velocidad: 1.1 },
  { tipo: "esfera", posicion: [-0.3, 2.3, -1], escala: 0.45, color: VIVO.rosa, velocidad: 1.4 },
  { tipo: "icosaedro", posicion: [0.5, -2.3, -0.3], escala: 0.45, color: VIVO.lavanda, velocidad: 1.2 },
];

function Geometria({ tipo }: { tipo: Forma["tipo"] }) {
  switch (tipo) {
    case "icosaedro":
      return <icosahedronGeometry args={[1, 0]} />;
    case "toro":
      return <torusGeometry args={[0.8, 0.32, 24, 64]} />;
    case "esfera":
      return <sphereGeometry args={[0.8, 32, 32]} />;
    case "octaedro":
      return <octahedronGeometry args={[0.9]} />;
  }
}

/** Las formas flotan solas y se inclinan con suavidad hacia el cursor. */
function Escena({ ligera }: { ligera: boolean }) {
  const grupo = useRef<Group>(null);

  useFrame((estado, delta) => {
    const g = grupo.current;
    if (!g) return;
    const { x, y } = estado.pointer;
    // Interpolación independiente de los cuadros por segundo: igual de fluida en cualquier equipo.
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (x * 0.4 - g.rotation.y) * k;
    g.rotation.x += (-y * 0.25 - g.rotation.x) * k;
  });

  const formas = ligera ? FORMAS.slice(0, 4) : FORMAS;

  return (
    <group ref={grupo}>
      {formas.map((f, i) => (
        <Float key={i} speed={f.velocidad} rotationIntensity={0.8} floatIntensity={1}>
          <mesh position={f.posicion} scale={f.escala}>
            <Geometria tipo={f.tipo} />
            <meshStandardMaterial
              color={f.color}
              emissive={f.color}
              emissiveIntensity={0.18}
              roughness={0.32}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

interface Props {
  /** Solo se renderiza mientras el Hero está en pantalla. */
  visible: boolean;
  /** En móviles se usan menos formas. */
  ligera: boolean;
}

export default function HeroScene({ visible, ligera }: Props) {
  const fuente = document.getElementById("inicio") ?? undefined;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={visible ? "always" : "never"}
      eventSource={fuente}
      eventPrefix="client"
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#8aa0e8", 0.7]} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} />
      <Escena ligera={ligera} />
    </Canvas>
  );
}
