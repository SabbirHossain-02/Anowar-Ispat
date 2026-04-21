import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Environment, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Shield, Maximize, Flame, GripHorizontal, Cpu, Crosshair, Box } from 'lucide-react';

const strengths = [
    { title: "SUPERIOR STRENGTH", icon: Shield },
    { title: "EXCELLENT DUCTILITY", icon: Maximize },
    { title: "EASY WELDABILITY", icon: Flame },
    { title: "IMPROVED RIB DESIGN", icon: GripHorizontal },
    { title: "TMT TECHNOLOGY", icon: Cpu },
    { title: "PRECISE STANDARDS", icon: Crosshair },
    { title: "CONTROLLED MICROSTRUCTURE", icon: Box },
];

const Planet = ({ data, index, total, inView }) => {
    const groupRef = useRef();
    const planetRef = useRef();
    
    // Orbit parameters
    const baseRadius = 5.2;
    const angleOffset = (index / total) * Math.PI * 2;
    
    // Animation state
    const animState = useRef({
        radius: 15 + Math.random() * 10, // Start far away
        yOffset: 0, // Enforce strict single-track height
        speed: 0.05, // Constant speed for all planets so they never overlap
        currentAngle: angleOffset
    });

    useEffect(() => {
        if (inView) {
            // Animate inwards like planets getting caught in gravity
            gsap.to(animState.current, {
                radius: baseRadius, // No variation, strictly on the track
                yOffset: 0, // Strict orbit plane
                duration: 2.5 + Math.random(),
                ease: "back.out(1.2)",
                delay: Math.random() * 0.5
            });
        }
    }, [inView, index]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        // Continuous rotation
        animState.current.currentAngle += delta * animState.current.speed;
        
        // Apply position
        const x = Math.cos(animState.current.currentAngle) * animState.current.radius;
        const z = Math.sin(animState.current.currentAngle) * animState.current.radius;
        
        groupRef.current.position.set(x, animState.current.yOffset, z);
        
        // Make the planet itself rotate
        if (planetRef.current) {
            planetRef.current.rotation.x += delta;
            planetRef.current.rotation.y += delta;
        }
    });

    return (
        <group ref={groupRef}>
            {/* The Planet Core */}
            <mesh ref={planetRef} castShadow>
                <icosahedronGeometry args={[0.2, 1]} />
                <meshStandardMaterial 
                    color={index % 2 === 0 ? "#e3182d" : "#ffffff"} 
                    metalness={0.8}
                    roughness={0.2}
                    emissive={index % 2 === 0 ? "#e3182d" : "#000000"}
                    emissiveIntensity={index % 2 === 0 ? 2 : 0}
                />
            </mesh>

            {/* Glowing ring around the planet */}
            <mesh rotation-x={Math.PI / 2}>
                <torusGeometry args={[0.4, 0.01, 16, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
            </mesh>

            {/* UI Label */}
            <Html 
                position={[0, 0.5, 0]} 
                center 
                style={{
                    transition: 'all 0.5s',
                    opacity: inView ? 1 : 0,
                    transform: `scale(${inView ? 1 : 0.5})`,
                }}
            >
                <div className="strength-label">
                    <div className="icon-box">
                        <data.icon size={18} color="#e3182d" />
                    </div>
                    <div className="text-box">
                        <span className="strength-title">{data.title}</span>
                    </div>
                </div>
            </Html>
        </group>
    );
};

export default function CoreStrengths3D({ inView }) {
    const centerRef = useRef();
    const ringRef = useRef();

    useFrame((state, delta) => {
        if (centerRef.current) {
            centerRef.current.rotation.y += delta * 0.1;
            centerRef.current.rotation.x += delta * 0.05;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            ringRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group rotation={[0.7, 0, 0]}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            {/* Central Star / Core */}
            <group ref={centerRef}>
                {/* Inner glowing core */}
                <Sphere args={[1.2, 64, 64]}>
                    <MeshDistortMaterial 
                        color="#050505" 
                        envMapIntensity={2} 
                        clearcoat={1} 
                        clearcoatRoughness={0.1} 
                        metalness={0.9} 
                        roughness={0.1}
                        distort={0.2}
                        speed={2}
                    />
                </Sphere>
                
                {/* Outer cage / wireframe */}
                <Sphere args={[1.3, 32, 32]}>
                    <meshStandardMaterial 
                        color="#e3182d" 
                        wireframe 
                        transparent 
                        opacity={0.3}
                        emissive="#e3182d"
                        emissiveIntensity={2}
                    />
                </Sphere>
            </group>

            {/* The Specific Orbit Track */}
            <mesh ref={ringRef} rotation-x={Math.PI / 2}>
                <torusGeometry args={[5.2, 0.015, 16, 100]} />
                <meshStandardMaterial color="#e3182d" metalness={1} roughness={0.5} emissive="#e3182d" emissiveIntensity={0.8} />
            </mesh>
            <mesh rotation-x={Math.PI / 2}>
                <torusGeometry args={[5.7, 0.008, 16, 100]} />
                <meshStandardMaterial color="#222" transparent opacity={0.4} />
            </mesh>

            {/* Planets */}
            {strengths.map((s, i) => (
                <Planet key={i} index={i} total={strengths.length} data={s} inView={inView} />
            ))}

            {/* Center Label */}
            <Html center position={[0, 0, 1.5]} zIndexRange={[100, 0]}>
                <div 
                    style={{
                        background: 'rgba(11, 11, 11, 0.85)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.5rem 2.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(227, 24, 45, 0.3)',
                        boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(227, 24, 45, 0.1)',
                        textAlign: 'center',
                        opacity: inView ? 1 : 0,
                        transform: `scale(${inView ? 1 : 0.8})`,
                        transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 1s',
                        pointerEvents: 'none',
                        width: 'max-content'
                    }}
                >
                    <h3 style={{ color: 'var(--subtext)', fontSize: '0.9rem', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'monospace' }}>WHY CHOOSE</h3>
                    <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '0.05em', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                        ANWAR <span style={{ color: 'var(--accent)' }}>ISPAT</span>
                    </h1>
                    <p style={{ color: 'var(--text)', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 600 }}>THE BEST?</p>
                </div>
            </Html>
        </group>
    );
}
