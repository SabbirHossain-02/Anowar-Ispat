import React, { useRef, useMemo, useEffect, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Sparks = React.forwardRef(({ count = 50 }, ref) => {
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

const Scene = () => {
    const blobRef = useRef()
    const rodRef = useRef()
    const groupRef = useRef()
    const sparksMatRef = useRef()

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".app-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        })

        // VideoHero -> Hero
        tl.to(blobRef.current.material, { opacity: 1, duration: 1, ease: "power1.inOut" }, 0)
        tl.to(sparksMatRef.current, { opacity: 1, duration: 1, ease: "power1.inOut" }, 0)

        // Hero -> Product & Service
        tl.to(blobRef.current.position, { y: -1, ease: "power1.inOut" }, 1)
        tl.to(blobRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }, 1)

        // Product & Service -> Better Tomorrow
        tl.to(blobRef.current.position, { y: 0, ease: "power1.inOut" }, 2)
        tl.to(blobRef.current.scale, { x: 0.2, y: 3, z: 0.2, duration: 1 }, 2)

        tl.to(blobRef.current.material, { opacity: 0, duration: 0.5 }, 2.5)
        tl.to(sparksMatRef.current, { opacity: 0, duration: 0.5 }, 2.5)
        tl.fromTo(rodRef.current.scale, { y: 0 }, { y: 1, duration: 1 }, 2.5)
        tl.to(rodRef.current.material, { opacity: 1, duration: 0.5 }, 2.5)

        // Better Tomorrow -> Career
        tl.to(rodRef.current.position, { x: -3, z: -2, rotationX: Math.PI / 4, duration: 1 }, 3)
        tl.to(rodRef.current.scale, { x: 0.5, z: 0.5, duration: 1 }, 3)

        // Career -> Media & Events
        tl.to(rodRef.current.position, { x: 3, z: -1, rotationX: -Math.PI / 4, rotationY: Math.PI, duration: 1 }, 4)
        tl.to(rodRef.current.scale, { x: 0.7, z: 0.7, duration: 1 }, 4)

        // Media & Events -> Blog
        tl.to(rodRef.current.position, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, duration: 1 }, 5)
        tl.to(rodRef.current.rotation, { y: Math.PI * 2, duration: 2 }, 5)

    }, [])

    useFrame((state) => {
        const { mouse } = state
        if (blobRef.current && blobRef.current.material) {
            blobRef.current.material.distort = THREE.MathUtils.lerp(
                blobRef.current.material.distort || 0.4,
                0.4 + mouse.x * 0.2,
                0.05
            )
        }
    })

    return (
        <group ref={groupRef}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={200} color="#E3182D" />
            <spotLight position={[-10, 10, 10]} intensity={500} color="#B00015" />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={blobRef} position={[2, 0, 0]}>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <MeshDistortMaterial
                        color="#E3182D"
                        speed={2}
                        distort={0.4}
                        radius={1}
                        emissive="#B00015"
                        emissiveIntensity={4}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0}
                    />
                </mesh>
            </Float>

            <mesh ref={rodRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
                <cylinderGeometry args={[0.2, 0.2, 10, 32]} />
                <meshStandardMaterial
                    color="#888"
                    metalness={1}
                    roughness={0.1}
                    transparent
                    opacity={0}
                />
            </mesh>

            <Sparks ref={sparksMatRef} count={100} />
            <Environment preset="city" />

            <ContactShadows
                position={[0, -3.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
            />
        </group>
    )
}

export default Scene

