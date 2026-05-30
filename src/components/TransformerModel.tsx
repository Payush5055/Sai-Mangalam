import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Electric arc particles ───────────────────────────────────────────── */
function ArcParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 60

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 1.2
      pos[i * 3 + 1] = 1.0 + Math.random() * 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8
      vel[i] = 0.002 + Math.random() * 0.003
    }
    return { positions: pos, velocities: vel }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] += velocities[i]
      if ((pos.array as Float32Array)[i * 3 + 1] > 1.9) {
        ;(pos.array as Float32Array)[i * 3]     = (Math.random() - 0.5) * 1.2
        ;(pos.array as Float32Array)[i * 3 + 1] = 1.0
        ;(pos.array as Float32Array)[i * 3 + 2] = (Math.random() - 0.5) * 0.8
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#88aaff"
        size={0.015}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── Transformer 3D mesh ──────────────────────────────────────────────── */
function TransformerMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.004
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05
  })

  const BUSHING_X = [-0.42, 0, 0.42]
  const RING_Y    = [1.05, 1.2, 1.35]
  const FIN_COUNT = 6
  const WHEEL_X   = [-0.55, 0.55]

  return (
    <group ref={groupRef}>
      {/* Main tank body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 2.0, 0.9]} />
        <meshStandardMaterial color="#4a4a5c" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Cooling fins — left */}
      {Array.from({ length: FIN_COUNT }, (_, i) => (
        <mesh key={`fl${i}`} position={[-0.82, -0.1 + i * 0.22, 0]}>
          <boxGeometry args={[0.06, 1.4, 0.7]} />
          <meshStandardMaterial color="#3a3a4a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Cooling fins — right */}
      {Array.from({ length: FIN_COUNT }, (_, i) => (
        <mesh key={`fr${i}`} position={[0.82, -0.1 + i * 0.22, 0]}>
          <boxGeometry args={[0.06, 1.4, 0.7]} />
          <meshStandardMaterial color="#3a3a4a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Base plate */}
      <mesh position={[0, -1.12, 0]}>
        <boxGeometry args={[1.7, 0.1, 1.1]} />
        <meshStandardMaterial color="#333342" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* HV bushings */}
      {BUSHING_X.map((x, bi) => (
        <group key={`b${bi}`}>
          <mesh position={[x, 1.25, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 16]} />
            <meshStandardMaterial color="#d0d0e0" metalness={0.3} roughness={0.5} />
          </mesh>
          {RING_Y.map((y, ri) => (
            <mesh key={`r${ri}`} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.095, 0.018, 8, 24]} />
              <meshStandardMaterial color="#c8c8d8" metalness={0.2} roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Conservator tank */}
      <mesh position={[0.3, 1.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
        <meshStandardMaterial color="#3a3a4a" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Breather pipe */}
      <mesh position={[0.3, 0.95, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#555566" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Rating plate */}
      <mesh position={[0, 0, 0.46]}>
        <boxGeometry args={[0.5, 0.3, 0.01]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Wheels */}
      {WHEEL_X.map((x, wi) => (
        <mesh key={`w${wi}`} position={[x, -1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
          <meshStandardMaterial color="#222232" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Export ────────────────────────────────────────────────────────────── */
export default function TransformerModel() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [3, 1.5, 4], fov: 38 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-4, 2, 2]} intensity={1.5} color="#a8c4ff" />
        <pointLight position={[4, -1, 3]} intensity={1.0} color="#ffeedd" />
        <spotLight position={[0, 6, 0]} intensity={0.8} angle={0.4} color="#ffffff" />
        <TransformerMesh />
        <ArcParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
