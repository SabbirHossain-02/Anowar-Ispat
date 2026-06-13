import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const IntroSparks = React.forwardRef(({ count = 50 }, ref) => {
    const mesh = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial ref={ref} color="#E3182D" emissive="#B00015" emissiveIntensity={5} transparent opacity={0} />
        </instancedMesh>
    )
})

const IntroScene = ({ onComplete }) => {
    const blobRef = useRef()
    const sparksMatRef = useRef()
    const groupRef = useRef()

    const anim = useRef({
        distort: 0.3,
        speed: 1.5,
        spinSpeed: 0.002
    }).current

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 100)
            }
        })

        const updateAnim = () => {
            if (blobRef.current?.material) {
                blobRef.current.material.distort = anim.distort
                blobRef.current.material.speed = anim.speed
            }
        }

        blobRef.current.position.y = 5.0
        blobRef.current.scale.set(0.15, 0.5, 0.15) // Stretched dropping shape

        // 1. Initial fade in 
        tl.to(blobRef.current.material, { opacity: 1, duration: 0.1 }, 0)
        tl.to(sparksMatRef.current, { opacity: 1, duration: 0.1 }, 0)

        // Fall 0
        tl.to(blobRef.current.position, { y: -0.75, duration: 0.35, ease: "power2.in" }, 0)

        // Impact 0 - Squash
        tl.to(blobRef.current.scale, { x: 0.45, y: 0.15, z: 0.45, duration: 0.1, ease: "power2.out" }, 0.35)
        tl.to(blobRef.current.position, { y: -0.95, duration: 0.1, ease: "power2.out" }, 0.35)
        tl.to(anim, { distort: 0.6, speed: 5.0, duration: 0.1, onUpdate: updateAnim }, 0.35)

        // Recover 0
        tl.to(blobRef.current.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.15, ease: "power2.in" }, 0.45)
        tl.to(blobRef.current.position, { y: -0.75, duration: 0.15, ease: "power2.in" }, 0.45)
        tl.to(anim, { distort: 0.3, speed: 1.5, duration: 0.15, onUpdate: updateAnim }, 0.45)

        let t = 0.8
        // Jump 1
        tl.to(blobRef.current.position, { y: 0.8, duration: 0.35, ease: "power2.out" }, t)
        tl.to(anim, { distort: 0.5, speed: 4.0, duration: 0.35, onUpdate: updateAnim }, t)

        // Fall 1
        t += 0.35
        tl.to(blobRef.current.position, { y: -0.75, duration: 0.3, ease: "power2.in" }, t)

        // Impact 1 - Squash
        t += 0.3
        tl.to(blobRef.current.scale, { x: 0.5, y: 0.15, z: 0.5, duration: 0.1, ease: "power2.out" }, t)
        tl.to(blobRef.current.position, { y: -0.95, duration: 0.1, ease: "power2.out" }, t)
        tl.to(anim, { distort: 0.8, speed: 6.0, duration: 0.1, onUpdate: updateAnim }, t)

        // Recover 1 / Launch 2
        t += 0.1
        tl.to(blobRef.current.scale, { x: 0.25, y: 0.4, z: 0.25, duration: 0.1, ease: "power2.in" }, t)
        tl.to(blobRef.current.position, { y: -0.2, duration: 0.1, ease: "power2.in" }, t)
        tl.to(anim, { distort: 0.5, speed: 4.0, duration: 0.1, onUpdate: updateAnim }, t)

        // Jump 2
        t += 0.1
        tl.to(blobRef.current.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.1 }, t) // normal shape
        tl.to(blobRef.current.position, { y: 1.2, duration: 0.35, ease: "power2.out" }, t)

        // Fall 2
        t += 0.35
        tl.to(blobRef.current.position, { y: -0.75, duration: 0.3, ease: "power2.in" }, t)

        // Impact 2 - Harder Squash
        t += 0.3
        tl.to(blobRef.current.scale, { x: 0.6, y: 0.1, z: 0.6, duration: 0.1, ease: "power2.out" }, t)
        tl.to(blobRef.current.position, { y: -1.05, duration: 0.1, ease: "power2.out" }, t)
        tl.to(anim, { distort: 1.2, speed: 12.0, spinSpeed: 0.1, duration: 0.1, onUpdate: updateAnim }, t)

        // Recover 2 / Launch 3
        t += 0.1
        tl.to(blobRef.current.scale, { x: 0.2, y: 0.6, z: 0.2, duration: 0.15, ease: "power2.in" }, t)
        tl.to(blobRef.current.position, { y: 0.0, duration: 0.15, ease: "power2.in" }, t)

        // Jump 3 (Center before Explosion)
        t += 0.15
        tl.to(blobRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.4, ease: "power2.out" }, t)
        tl.to(blobRef.current.position, { y: 0, duration: 0.6, ease: "power2.out" }, t)
        tl.to(anim, { distort: 0.1, speed: 15.0, duration: 0.6, onUpdate: updateAnim }, t)

        // BURST: Covering the whole screen
        t += 0.5
        tl.to(blobRef.current.scale, { x: 50, y: 50, z: 50, duration: 0.8, ease: "expo.in" }, t)
        tl.to(blobRef.current.position, { x: 0, y: 0, z: 4.5, duration: 0.8, ease: "expo.in" }, t)
        tl.to(anim, { distort: 0, speed: 20.0, duration: 0.8, onUpdate: updateAnim }, t)

        tl.to(blobRef.current.material, { opacity: 0, duration: 0.2, ease: "power2.out" }, t + 0.65)
        tl.to(sparksMatRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" }, t + 0.65)
    }, [])

    useFrame((state, delta) => {
        if (blobRef.current) {
            // Spin
            blobRef.current.rotation.x += anim.spinSpeed
            blobRef.current.rotation.y += anim.spinSpeed
        }
    })

    return (
        <group ref={groupRef}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={200} color="#E3182D" />
            <spotLight position={[-10, 10, 10]} intensity={500} color="#B00015" />

            <mesh ref={blobRef} scale={[0.3, 0.3, 0.3]}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <MeshDistortMaterial
                    color="#E3182D"
                    speed={1.5}
                    distort={0.3}
                    radius={1}
                    emissive="#B00015"
                    emissiveIntensity={4}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <IntroSparks ref={sparksMatRef} count={350} />
            <Environment preset="city" />

            <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.8}
                scale={6}
                blur={2.5}
                far={2.5}
                color="#000000"
            />
        </group>
    )
}

const IntroLoader = ({ onComplete }) => {
    const containerRef = useRef()

    const handleComplete = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: onComplete
        })
    }

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0B0B0B',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'all'
        }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                <IntroScene onComplete={handleComplete} />
            </Canvas>
        </div>
    )
}

export default IntroLoader

