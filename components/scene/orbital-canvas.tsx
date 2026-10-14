"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
type SceneProps = {
  running: boolean;
  speed: number;
  layers: boolean[];
  pointer: React.RefObject<{ x: number; y: number }>;
  onReady: () => void;
  onFailure: () => void;
};
function ContextGuard({
  onReady,
  onFailure,
}: Pick<SceneProps, "onReady" | "onFailure">) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onReady, onFailure]);
  return null;
}
function Environment() {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 1.05;
    invalidate();
    return () => {
      scene.environment = null;
      target.dispose();
      room.dispose();
      generator.dispose();
    };
  }, [gl, scene, invalidate]);
  return null;
}
function ArcBand({
  radius,
  arc,
  width = 0.16,
}: {
  radius: number;
  arc: number;
  width?: number;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, radius + width / 2, 0, arc, false);
    s.lineTo(
      Math.cos(arc) * (radius - width / 2),
      Math.sin(arc) * (radius - width / 2),
    );
    s.absarc(0, 0, radius - width / 2, arc, 0, true);
    s.closePath();
    return s;
  }, [radius, arc, width]);
  return (
    <extrudeGeometry
      args={[
        shape,
        {
          depth: 0.085,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.025,
          bevelThickness: 0.02,
          curveSegments: 72,
        },
      ]}
    />
  );
}
function Sculpture({
  running,
  speed,
  layers,
  pointer,
}: {
  running: boolean;
  speed: number;
  layers: boolean[];
  pointer: SceneProps["pointer"];
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const middle = useRef<THREE.Group>(null);
  const phase = useRef(0);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        0.3 + (pointer.current?.y || 0) * 0.12,
        4,
        d,
      );
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        -0.35 + (pointer.current?.x || 0) * 0.14,
        4,
        d,
      );
    }
    if (running) {
      phase.current += d * speed * 0.16;
      if (inner.current) inner.current.rotation.z = 0.6 + phase.current;
      if (middle.current)
        middle.current.rotation.y = 0.8 + Math.sin(phase.current) * 0.18;
    }
  });
  const metal = (
    <meshPhysicalMaterial
      color="#778270"
      metalness={1}
      roughness={0.28}
      clearcoat={0.3}
    />
  );
  return (
    <group ref={group} rotation={[0.3, -0.35, -0.35]}>
      <group rotation={[0.15, 0.2, 0]} visible={layers[0]}>
        <mesh>
          {metal}
          <ArcBand radius={2.3} width={0.19} arc={Math.PI * 1.73} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI * 1.76]} position={[2.3, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#c5ff67"
            emissive="#c5ff67"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
      <group ref={middle} rotation={[1.05, 0.8, -0.2]} visible={layers[1]}>
        <mesh>
          {metal}
          <ArcBand radius={1.85} width={0.2} arc={Math.PI * 1.68} />
        </mesh>
        <mesh rotation={[0, 0, 0.12]}>
          <torusGeometry args={[1.865, 0.012, 6, 70, Math.PI * 1.1]} />
          <meshStandardMaterial
            color="#e8eddf"
            metalness={1}
            roughness={0.17}
          />
        </mesh>
      </group>
      <group ref={inner} rotation={[-0.85, 0.3, 0.6]} visible={layers[2]}>
        <mesh>
          {metal}
          <ArcBand radius={1.46} width={0.12} arc={Math.PI * 1.75} />
        </mesh>
        <mesh position={[1.46, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#c5ff67"
            emissive="#c5ff67"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
      <group rotation={[0.45, 0, -0.18]}>
        <mesh>
          <sphereGeometry args={[0.79, 40, 28]} />
          <meshPhysicalMaterial
            color="#303b32"
            metalness={0.96}
            roughness={0.24}
            clearcoat={0.5}
          />
        </mesh>
        {[-0.58, -0.34, 0, 0.34, 0.58].map((y, i) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry
              args={[
                Math.sqrt(0.79 * 0.79 - y * y) + 0.009,
                i === 2 ? 0.014 : 0.008,
                6,
                64,
              ]}
            />
            <meshStandardMaterial
              color={i === 2 ? "#c5ff67" : "#8fa088"}
              metalness={i === 2 ? 0.4 : 1}
              roughness={0.2}
              emissive={i === 2 ? "#8eca43" : "#000000"}
              emissiveIntensity={i === 2 ? 0.7 : 0}
            />
          </mesh>
        ))}
        {[0, Math.PI / 3, (Math.PI * 2) / 3].map((z) => (
          <mesh key={z} rotation={[0, 0, z]}>
            <torusGeometry args={[0.802, 0.006, 6, 64]} />
            <meshStandardMaterial
              color="#53694d"
              metalness={0.9}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
export default function OrbitalCanvas(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, matchMedia("(max-width: 800px)").matches ? 1 : 1.5]}
      camera={{ position: [0, 0, 7.8], fov: 42 }}
      frameloop={props.running ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[-3, 4, 5]} intensity={4} color="#eff2e7" />
      <directionalLight position={[4, -2, 1]} intensity={2} color="#bbd898" />
      <ContextGuard onReady={props.onReady} onFailure={props.onFailure} />
      <Environment />
      <Sculpture {...props} />
    </Canvas>
  );
}
