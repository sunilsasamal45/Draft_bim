import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* Wireframe architectural building */
function Building() {
  const group = useRef()
  const { mouse } = useThree()

  useFrame((state) => {
    if (!group.current) return
    // Idle rotation
    group.current.rotation.y += 0.003
    // Subtle mouse parallax
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.12, 0.05)
    group.current.rotation.y += THREE.MathUtils.lerp(0, mouse.x * 0.04, 0.05)
  })

  const mat = new THREE.LineBasicMaterial({ color: '#1a5fa8', transparent: true, opacity: 0.7 })
  const matAccent = new THREE.LineBasicMaterial({ color: '#4a90d9', transparent: true, opacity: 0.5 })

  function box(w, h, d) {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d))
  }

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Main body */}
      <lineSegments geometry={box(1.6, 1.8, 1.2)} material={mat} position={[0, 0, 0]} />
      {/* Roof slab */}
      <lineSegments geometry={box(1.7, 0.08, 1.3)} material={matAccent} position={[0, 0.94, 0]} />
      {/* Upper floor */}
      <lineSegments geometry={box(1.4, 0.7, 1.0)} material={mat} position={[0, 0.7, 0]} />
      {/* Columns */}
      {[[-0.65, 0, -0.45], [0.65, 0, -0.45], [-0.65, 0, 0.45], [0.65, 0, 0.45]].map(([x, y, z], i) => (
        <lineSegments key={i} geometry={box(0.08, 1.8, 0.08)} material={matAccent} position={[x, y, z]} />
      ))}
      {/* Ground slab */}
      <lineSegments geometry={box(2.0, 0.06, 1.6)} material={matAccent} position={[0, -0.93, 0]} />
      {/* Window grid front */}
      {[-0.45, 0, 0.45].map((x, i) => (
        <lineSegments key={`w${i}`} geometry={box(0.28, 0.36, 0.02)} material={matAccent} position={[x, 0.1, 0.61]} />
      ))}
      {/* Window grid top floor */}
      {[-0.4, 0.1, 0.6].map((x, i) => (
        <lineSegments key={`wt${i}`} geometry={box(0.22, 0.22, 0.02)} material={matAccent} position={[x, 0.72, 0.51]} />
      ))}
    </group>
  )
}

export default function ArchScene() {
  return (
    <Canvas
      camera={{ position: [3, 2, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#e8f0ff" />
      <pointLight position={[-3, 3, -3]} intensity={0.3} color="#1a5fa8" />
      <Building />
    </Canvas>
  )
}
