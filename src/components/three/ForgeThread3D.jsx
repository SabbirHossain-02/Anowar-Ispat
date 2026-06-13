import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const steelColor = new THREE.Color('#e0e5ec'); // Shiny bright steel

export default function ForgeThread3D({ scrollProgress }) {
    const { viewport } = useThree();
    const rodRef = useRef();
    const tipRef = useRef();
    const materialRef = useRef();
    const tipMaterialRef = useRef();
    
    // Textures for realism
    const rebarTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        // Dark base
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, 128, 128);
        
        // Perfectly even, thin horizontal strips (ribs)
        ctx.fillStyle = '#ffffff';
        const ribThickness = 2; // Very thin for subtle look
        const ribSpacing = 16;  // Evenly spaced
        
        for(let y = 0; y < 128; y += ribSpacing) {
            ctx.fillRect(0, y, 128, ribThickness); 
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;
        texture.needsUpdate = true;
        return texture;
    }, []);

    const sparkTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 220, 100, 1)');
        grad.addColorStop(0.5, 'rgba(255, 100, 0, 0.4)');
        grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        
        return new THREE.CanvasTexture(canvas);
    }, []);
    
    // Simple stable particle system
    const particleCount = 400; 
    const particlesRef = useRef();
    
    // Create random start positions and velocities
    const particleData = useMemo(() => {
        const data = [];
        for (let i = 0; i < particleCount; i++) {
            data.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 8, 
                    Math.random() * 5 + 2, 
                    (Math.random() - 0.5) * 8
                ),
                life: Math.random() * 0.5,
                maxLife: 0.2 + Math.random() * 0.4
            });
        }
        return data;
    }, []);

    const positions = useMemo(() => {
        const arr = new Float32Array(particleCount * 3);
        for(let i=0; i<particleCount; i++) {
            arr[i*3] = 999;
            arr[i*3+1] = 999;
            arr[i*3+2] = 999;
        }
        return arr;
    }, []);
    
    useFrame((state, delta) => {
        // Clamp progress between 0 and 1
        const progress = Math.max(0, Math.min(1, scrollProgress / 100)); 
        
        // --- 1. Rod Length ---
        const maxLength = viewport.height;
        const currentLength = progress * maxLength;
        
        if (rodRef.current) {
            rodRef.current.scale.y = Math.max(0.001, currentLength);
            rodRef.current.position.y = (viewport.height / 2) - (currentLength / 2);
            
            // Evenly spaced tiling
            if (materialRef.current && materialRef.current.bumpMap) {
                 materialRef.current.bumpMap.repeat.y = currentLength * 12; 
            }
        }
        
        // --- 2. Tip Position ---
        const tipY = (viewport.height / 2) - currentLength;
        if (tipRef.current && tipMaterialRef.current) {
            tipRef.current.position.y = tipY;
            
            // We want sparking and red color to continue until near the end.
            // Let's create a specific color/metal transition progress
            const chromeProgress = Math.max(0, Math.min(1, (progress - 0.7) * 3.33));
            const wobbleIntensity = Math.max(0, 1 - chromeProgress);
            const time = state.clock.getElapsedTime();
            
            tipRef.current.scale.set(
                1 + Math.sin(time * 20) * 0.15 * wobbleIntensity,
                1 + Math.cos(time * 15) * 0.2 * wobbleIntensity,
                1 + Math.sin(time * 25) * 0.2 * wobbleIntensity
            );
            tipRef.current.rotation.x = time * 3;
            tipRef.current.rotation.y = time * 4;
            
            tipRef.current.scale.multiplyScalar(0.6 + 0.4 * Math.max(0, 1 - chromeProgress)); 
            
            tipMaterialRef.current.color.lerpColors(new THREE.Color('#e3182d'), steelColor, chromeProgress);
            tipMaterialRef.current.emissive.lerpColors(new THREE.Color('#e3182d'), new THREE.Color('#000000'), chromeProgress);
            tipMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(4.0, 0.0, chromeProgress);
            tipMaterialRef.current.metalness = THREE.MathUtils.lerp(0.1, 1.0, chromeProgress);
            tipMaterialRef.current.roughness = THREE.MathUtils.lerp(0.9, 0.1, chromeProgress);
        }
        
        // --- 3. Material Transition ---
        const chromeProgress = Math.max(0, Math.min(1, (progress - 0.7) * 3.33));
        if (materialRef.current) {
            materialRef.current.color.lerpColors(new THREE.Color('#e3182d'), steelColor, chromeProgress);
            materialRef.current.emissive.lerpColors(new THREE.Color('#e3182d'), new THREE.Color('#000000'), chromeProgress);
            materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(3.0, 0.0, chromeProgress);
            materialRef.current.metalness = THREE.MathUtils.lerp(0.1, 1.0, chromeProgress);
            materialRef.current.roughness = THREE.MathUtils.lerp(0.9, 0.1, chromeProgress);
        }

        // --- 4. Brutal Factory Sparks ---
        if (particlesRef.current) {
            const posArray = particlesRef.current.geometry.attributes.position.array;
            
            // Amount of sparks gradually decreases starting later
            const spawnChance = Math.max(0, 1 - Math.max(0, progress - 0.5) * 2.5); // stays 1.0 until 0.5, then drops to 0 by 0.9
            
            for (let i = 0; i < particleCount; i++) {
                const p = particleData[i];
                p.life += delta;
                
                if (p.life >= p.maxLife) {
                    p.life = 0;
                    
                    if (progress >= 0.0 && tipRef.current && Math.random() < spawnChance) {
                         posArray[i * 3] = tipRef.current.position.x + (Math.random() - 0.5) * 0.1;
                         posArray[i * 3 + 1] = tipRef.current.position.y + (Math.random() - 0.5) * 0.1;
                         posArray[i * 3 + 2] = tipRef.current.position.z + (Math.random() - 0.5) * 0.1;

                         p.velocity.set(
                              (Math.random() - 0.5) * 2.5, // reduced narrow horizontal scatter
                              (Math.random() * 2) + 0.5, // blast slightly upwards, drop fast
                              (Math.random() - 0.5) * 2.5
                         );
                    } else {
                         posArray[i * 3] = 999;
                         posArray[i * 3 + 1] = 999;
                         posArray[i * 3 + 2] = 999;
                    }
                } else {
                    p.velocity.y -= 25 * delta; // heavy gravity
                    p.velocity.x *= 0.95; // drag to slow the horizontal spread over time
                    p.velocity.z *= 0.95;
                    
                    posArray[i * 3] += p.velocity.x * delta;
                    posArray[i * 3 + 1] += p.velocity.y * delta;
                    posArray[i * 3 + 2] += p.velocity.z * delta;
                }
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            
            // Scale overall opacity down slightly across the transition bounds
            particlesRef.current.material.opacity = Math.max(0, 1 - Math.max(0, progress - 0.7) * 3);
        }
    });

    return (
        <group>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={2.0} />
            <directionalLight position={[-10, 5, -10]} intensity={0.5} color="#e3182d" />

            {/* The Rod */}
            <mesh ref={rodRef} receiveShadow castShadow>
                <cylinderGeometry args={[0.006, 0.006, 1, 32]} />
                <meshStandardMaterial 
                    ref={materialRef} 
                    color="#e3182d"
                    emissive="#e3182d"
                    emissiveIntensity={3}
                    metalness={0.1}
                    roughness={0.9}
                    map={rebarTexture}
                    emissiveMap={rebarTexture}
                    bumpMap={rebarTexture}
                    bumpScale={0.08} // Very minimum height for a subtle 3D vibe
                    toneMapped={false}
                />
            </mesh>

            {/* The Tip */}
            <mesh ref={tipRef} receiveShadow castShadow>
                <icosahedronGeometry args={[0.016, 3]} />
                <meshStandardMaterial 
                    ref={tipMaterialRef}
                    color="#e3182d"
                    emissive="#e3182d"
                    emissiveIntensity={4}
                    toneMapped={false}
                />
            </mesh>

            {/* Stable Points Particle System */}
            <points ref={particlesRef} frustumCulled={false}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial 
                    size={6}
                    sizeAttenuation={false}
                    color="#ffffff"
                    map={sparkTexture}
                    transparent={true}
                    opacity={1}
                    depthWrite={false}
                    toneMapped={false}
                />
            </points>
        </group>
    );
}

