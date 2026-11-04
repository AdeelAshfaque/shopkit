import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, RoundedBox, Text } from '@react-three/drei'
import { Component, Suspense, useRef, type ErrorInfo, type ReactNode } from 'react'
import * as THREE from 'three'

function PerfumeObject() {
  const bottle = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!bottle.current) return
    bottle.current.rotation.y +=
      ((pointer.current.x * 0.36 +
        Math.sin(state.clock.elapsedTime * 0.25) * 0.11) -
        bottle.current.rotation.y) *
      Math.min(1, delta * 2.4)
    bottle.current.rotation.x +=
      (pointer.current.y * 0.16 - bottle.current.rotation.x) *
      Math.min(1, delta * 2.2)
  })

  return (
    <group
      ref={bottle}
      onPointerMove={(event) => {
        pointer.current.x = event.pointer.x
        pointer.current.y = event.pointer.y
      }}
      onPointerLeave={() => {
        pointer.current.x = 0
        pointer.current.y = 0
      }}
    >
      <Float floatIntensity={0.24} rotationIntensity={0.08} speed={1.35}>
        <RoundedBox args={[1.62, 2.12, 0.77]} radius={0.19} smoothness={5} position={[0, -0.02, 0]}>
          <meshPhysicalMaterial
            color="#d5c6ad"
            metalness={0.14}
            roughness={0.12}
            transmission={0.58}
            thickness={1.3}
            clearcoat={0.9}
          />
        </RoundedBox>
        <RoundedBox args={[1.31, 1.18, 0.56]} radius={0.12} smoothness={4} position={[0, -0.39, 0.01]}>
          <meshPhysicalMaterial color="#a28c72" metalness={0.22} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.24, 0.27, 0.36, 48]} />
          <meshStandardMaterial color="#b89f78" metalness={0.82} roughness={0.22} />
        </mesh>
        <mesh position={[0, 1.41, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.2, 48]} />
          <meshStandardMaterial color="#292722" metalness={0.5} roughness={0.25} />
        </mesh>
        <RoundedBox args={[1.18, 0.66, 0.035]} radius={0.02} smoothness={2} position={[0, -0.05, 0.4]}>
          <meshStandardMaterial color="#eee8dd" roughness={0.78} />
        </RoundedBox>
        <Text
          color="#24231f"
          fontSize={0.125}
          letterSpacing={0.16}
          anchorX="center"
          anchorY="middle"
          position={[0, 0.075, 0.43]}
        >
          MAISON
        </Text>
        <Text
          color="#777064"
          fontSize={0.065}
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
          position={[0, -0.11, 0.43]}
        >
          NO. 04 / SANTAL
        </Text>
      </Float>
    </group>
  )
}

class CanvasFallbackBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('The Maison 3D fragrance scene could not be rendered.', error, info)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function PerfumeCanvas({ fallback }: { fallback: ReactNode }) {
  return (
    <CanvasFallbackBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0, 5.3], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.7} />
          <directionalLight color="#fff4e3" intensity={3.5} position={[3, 4, 5]} />
          <directionalLight color="#d3c4aa" intensity={2} position={[-4, 1, -3]} />
          <Environment preset="studio" />
          <PerfumeObject />
        </Suspense>
      </Canvas>
    </CanvasFallbackBoundary>
  )
}

export default PerfumeCanvas
