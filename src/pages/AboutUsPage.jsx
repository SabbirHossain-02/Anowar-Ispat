import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// HELPER: Magnetic 3D Card
// -------------------------------------------------------------
const MagneticCard = ({ children, className, style }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // 3D Tilt + lighting movement
        gsap.to(cardRef.current, {
            rotationY: x * 0.05,
            rotationX: -y * 0.05,
            transformPerspective: 1500,
            ease: "power2.out",
            duration: 0.6
        });
        
        // Find internal image and give it parallax
        const img = cardRef.current.querySelector('.pop-out-img');
        if (img) {
            gsap.to(img, {
                x: x * 0.1,
                y: y * 0.1,
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            ease: "power3.out",
            duration: 1.2
        });
        
        const img = cardRef.current.querySelector('.pop-out-img');
        if (img) {
            gsap.to(img, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            });
        }
    };

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave} 
            className={className} 
            style={{ transformStyle: "preserve-3d", position: 'relative', ...style }}
        >
            {children}
        </div>
    );
};

// -------------------------------------------------------------
// HELPER: Word Reveal (Cinematic text entrance)
// -------------------------------------------------------------
const RevealText = ({ text, className, style, wordClass = "reveal-word" }) => {
    const words = text.split(' ');
    return (
        <div className={className} style={style}>
            {words.map((word, i) => (
                <span key={i} style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.25em' }}>
                    <span className={wordClass} style={{ transform: 'translateY(120%)', paddingBottom: '0.1em', display: 'inline-block', willChange: 'transform' }}>
                        {word}
                    </span>
                </span>
            ))}
        </div>
    );
};


// -------------------------------------------------------------
// MAIN COMPONENT: About Us Page
// -------------------------------------------------------------
const AboutUsPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // 1. Hero Reveal Animation
        const heroTl = gsap.timeline();
        
        heroTl.fromTo('.hero-subtitle', 
            { opacity: 0, letterSpacing: '0em', filter: 'blur(10px)' },
            { opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)', duration: 1.5, ease: "power3.out" }
        )
        .fromTo('.hero-title .reveal-word',
            { y: '120%', rotationZ: 5 },
            { y: '0%', rotationZ: 0, duration: 1.2, stagger: 0.05, ease: "power4.out" },
            "-=1.0"
        )
        .fromTo('.hero-desc',
            { opacity: 0, y: 30, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
            { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.5, ease: "power3.out" },
            "-=0.8"
        );

        // Scroll Parallax for Background Orbs
        gsap.to('.ambient-orb', {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // 2. Sections Cinematic Entrance
        const sections = gsap.utils.toArray('.cinematic-section');
        sections.forEach((sec) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sec,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // Card body entrance
            tl.fromTo(sec.querySelector('.glass-card-bg'),
                { opacity: 0, scale: 0.95, y: 50, filter: 'blur(20px)' },
                { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }
            );

            // Text reveal
            const words = sec.querySelectorAll('.sec-title .reveal-word');
            if (words.length > 0) {
                tl.fromTo(words, 
                    { y: '120%', rotationX: 45 },
                    { y: '0%', rotationX: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" },
                    "-=0.8"
                );
            }

            // Image pop-in
            const img = sec.querySelector('.pop-out-img');
            if (img) {
                tl.fromTo(img,
                    { opacity: 0, y: 100, scale: 0.9, filter: 'brightness(0)' },
                    { opacity: 1, y: 0, scale: 1, filter: 'brightness(1)', duration: 1.5, ease: "expo.out" },
                    "-=1"
                );
            }
            
            // Description fade
            const desc = sec.querySelector('.sec-desc');
            if (desc) {
                tl.fromTo(desc, 
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
                    "-=1"
                );
            }
        });

        // 3. The Bloodline Vertical Thread Draw
        gsap.fromTo('.bloodline-thread',
            { scaleY: 0, filter: 'blur(5px)' },
            { 
                scaleY: 1, 
                filter: 'blur(0px)',
                duration: 2, 
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: '.bloodline-thread',
                    start: "top 60%",
                    end: "bottom 40%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ background: '#070707', color: 'white', minHeight: '100vh', padding: '0 0 150px 0', overflowX: 'hidden', position: 'relative' }}>
            
            {/* Ambient Backgrounds (Molten Orbs) */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', top: '40%', right: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(42,42,42,0.8) 0%, transparent 60%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', bottom: '-10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(227,24,45,0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            
            <div style={{ position: 'absolute', inset: 0, background: 'url(/noise.png)', opacity: 0.03, pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 1 }}></div>

            {/* ------------------------------------------------------------- */}
            {/* HERO SECTION */}
            {/* ------------------------------------------------------------- */}
            <section style={{ height: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%', paddingBottom: '10vh' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '1rem', marginBottom: '2rem', display: 'inline-block', borderBottom: '1px solid rgba(255,106,0,0.3)', paddingBottom: '0.5rem' }}>
                        // A CENTURY OF STRENGTH
                    </p>
                    
                    <RevealText 
                        text="FORGED IN FIRE." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '0.5rem', color: '#fff' }} 
                    />
                    <RevealText 
                        text="BUILT FOR ETERNITY." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '3rem', color: '#888' }} 
                    />
                    
                    <div className="hero-desc" style={{ maxWidth: '800px', background: 'rgba(11,11,11,0.6)', backdropFilter: 'blur(20px)', borderLeft: '4px solid var(--accent)', padding: '2rem', borderRadius: '0 12px 12px 0' }}>
                        <p style={{ color: '#ccc', fontSize: '1.25rem', lineHeight: 1.8, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            As a proud concern of the century-old Anwar Group, Anwar Ispat has led the mild steel industry since 1978. 
                            We were the first to introduce 60-grade steel to Bangladesh. From the tallest skyscrapers to complex nuclear power plants, 
                            our commitment to exceptional metallurgy ensures every structure is resilient, durable, and safe.
                        </p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* THE CORE (FATHER) */}
            {/* ------------------------------------------------------------- */}
            <section className="cinematic-section" style={{ position: 'relative', zIndex: 3, padding: '5rem 5%', display: 'flex', justifyContent: 'center' }}>
                <MagneticCard className="core-card" style={{ width: '100%', maxWidth: '1200px' }}>
                    <div className="glass-card-bg" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', background: 'rgba(15,15,15,0.7)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,106,0,0.2)', boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.5)' }}>
                        
                        {/* Text Content */}
                        <div style={{ flex: '1 1 500px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                            <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem', opacity: 0.8 }}>01 — THE VANGUARD</p>
                            <RevealText text="MANWAR HOSSAIN" className="sec-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'white', marginBottom: '0.5rem', lineHeight: 1, fontWeight: 800 }} />
                            <h4 style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '2.5rem', fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                Chairman, Anwar Group of Industries
                            </h4>
                            <p className="sec-desc" style={{ color: '#d0d0d0', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                Succeeding his father, the legendary Late Anwar Hossain, Manwar oversees a massive empire of industry. Having joined the family business in 1993, his leadership is the bedrock upon which the entire group expands its monumental footprint across Bangladesh.
                            </p>
                        </div>

                        {/* Image Container (Overflow visible for 3D Pop from top/sides) */}
                        <div style={{ flex: '1 1 500px', position: 'relative', minHeight: '600px', pointerEvents: 'none' }}>
                            {/* Inner ambient glow behind subject */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%', background: 'radial-gradient(ellipse at bottom, rgba(227,24,45,0.25) 0%, transparent 70%)', borderBottomRightRadius: '24px' }}></div>
                            
                            {/* The Pop Out Image */}
                            <img 
                                src="/Manwar-Hossain-transparent-1by1-ar.png" 
                                alt="Manwar Hossain" 
                                className="pop-out-img"
                                style={{ 
                                    position: 'absolute', 
                                    bottom: 0, 
                                    right: '5%', 
                                    width: '110%', 
                                    height: 'auto', 
                                    maxHeight: '120%', // allowing it to exceed the container top
                                    objectFit: 'contain', 
                                    objectPosition: 'bottom', 
                                    transformOrigin: 'bottom center',
                                    filter: 'drop-shadow(0px -10px 30px rgba(0,0,0,0.8))' 
                                }} 
                            />
                        </div>
                    </div>
                </MagneticCard>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* THE BLOODLINE (Connecting Thread) */}
            {/* ------------------------------------------------------------- */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', zIndex: 1, height: '150px' }}>
                <div className="bloodline-thread" style={{ 
                    width: '3px', 
                    height: '100%', 
                    background: 'linear-gradient(to bottom, rgba(255,106,0,1) 0%, rgba(227,24,45,0.5) 50%, rgba(255,255,255,0) 100%)', 
                    boxShadow: '0 0 20px rgba(255,106,0,0.6)',
                    transformOrigin: 'top center'
                }} />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* THE EXPANDING FORCE (SONS) */}
            {/* ------------------------------------------------------------- */}
            <section style={{ position: 'relative', zIndex: 3, padding: '0 2%', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                    
                    {/* Furkaan */}
                    <div className="cinematic-section">
                        <MagneticCard style={{ height: '100%' }}>
                            <div className="glass-card-bg" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.1)', overflow: 'visible', position: 'relative' }}>
                                
                                {/* Image popping out top */}
                                <div style={{ height: '450px', width: '100%', position: 'relative', pointerEvents: 'none' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 80%)' }} />
                                    <img 
                                        src="/Furkaan-Hossain-transparent-1by1-ar.png" 
                                        alt="Furkaan N Hossain" 
                                        className="pop-out-img"
                                        style={{ 
                                            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                                            height: '115%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom',
                                            transformOrigin: 'bottom center', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))'
                                        }} 
                                    />
                                </div>
                                
                                {/* Info Box */}
                                <div style={{ padding: '3rem 2.5rem', flexGrow: 1, zIndex: 10, background: 'rgba(0,0,0,0.5)', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                                    <RevealText text="FURKAAN N HOSSAIN" className="sec-title" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.1, fontWeight: 700 }} />
                                    <p style={{ color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>// DEPUTY MANAGING DIRECTOR</p>
                                    <p className="sec-desc" style={{ color: '#bbb', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
                                        Oversees Anwar Ispat and leads the Building Material Division. As the Founder Deputy MD of Anwar Technologies, he champions the group's global tech transformation, embedding innovation deeply into traditional industry.
                                    </p>
                                </div>
                            </div>
                        </MagneticCard>
                    </div>

                    {/* Waeez */}
                    <div className="cinematic-section">
                        <MagneticCard style={{ height: '100%' }}>
                            <div className="glass-card-bg" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.1)', overflow: 'visible', position: 'relative' }}>
                                
                                {/* Image popping out top */}
                                <div style={{ height: '450px', width: '100%', position: 'relative', pointerEvents: 'none' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 80%)' }} />
                                    <img 
                                        src="/Waeez-R-Hossain-transparent-1by1-ar.png" 
                                        alt="Waeez R Hossain" 
                                        className="pop-out-img"
                                        style={{ 
                                            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                                            height: '115%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom',
                                            transformOrigin: 'bottom center', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))'
                                        }} 
                                    />
                                </div>
                                
                                {/* Info Box */}
                                <div style={{ padding: '3rem 2.5rem', flexGrow: 1, zIndex: 10, background: 'rgba(0,0,0,0.5)', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                                    <RevealText text="WAEEZ R HOSSAIN" className="sec-title" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.1, fontWeight: 700 }} />
                                    <p style={{ color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>// DEPUTY MANAGING DIRECTOR</p>
                                    <p className="sec-desc" style={{ color: '#bbb', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
                                        A brilliant strategic thinker guiding the Building Material Division toward exponential growth. Fostering efficiency and sustainable innovation, he aligns long-term visions with immediate, heavy-infrastructure impacts.
                                    </p>
                                </div>
                            </div>
                        </MagneticCard>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default AboutUsPage;
