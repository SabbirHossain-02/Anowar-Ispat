import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Eye, Flame, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// HELPER: Word Reveal (Cinematic text entrance)
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

const VisionMissionPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Hero Reveal
        const heroTl = gsap.timeline();
        heroTl.fromTo('.hero-subtitle', 
            { opacity: 0, letterSpacing: '0em', filter: 'blur(10px)' },
            { opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }
        )
        .fromTo('.hero-title .reveal-word',
            { y: '120%', rotationZ: 4 },
            { y: '0%', rotationZ: 0, duration: 1.0, stagger: 0.05, ease: "power4.out" },
            "-=0.8"
        )
        .fromTo('.hero-desc',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
            "-=0.6"
        );

        // Scroll animations for sections
        const sections = gsap.utils.toArray('.vision-section');
        sections.forEach((sec) => {
            gsap.fromTo(sec.querySelectorAll('.fade-in-element'),
                { opacity: 0, y: 40, filter: 'blur(5px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.0,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Ambient orbs parallax
        gsap.to('.ambient-orb', {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', padding: '0 0 150px 0', overflowX: 'hidden', position: 'relative' }}>
            
            {/* Ambient Molten Glowing Backgrounds */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', top: '35%', right: '-20%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(227,24,45,0.08) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', bottom: '-5%', left: '15%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(255,106,0,0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // Purpose & Alignment
                    </p>
                    <RevealText 
                        text="PURPOSE FORGED" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="IN STEEL." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                    <div className="hero-desc" style={{ maxWidth: '750px', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderBottom: '4px solid var(--accent)', padding: '2rem', borderRadius: '12px', borderTop: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', borderLeft: '1px solid var(--glass-border)' }}>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.2rem', lineHeight: 1.8, margin: 0 }}>
                            Anwar Ispat doesn't just sell steel reinforcement rebars. We design and deliver the metal resilience required to keep Bangladesh standing safe, proud, and forward-looking.
                        </p>
                    </div>
                </div>
            </section>

            {/* VISION SECTION */}
            <section className="vision-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* Left: Premium visual representation (Image Slot) */}
                    <div className="fade-in-element" style={{ flex: '1 1 450px', position: 'relative', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                        <img 
                            src="/images/vision_skyline.jpg" 
                            alt="Dhaka Skyline Wireframe representation" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            onError={(e) => {
                                // Keep beautiful fallback styling
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div style={{ position: 'absolute', inset: 0, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <Eye size={120} strokeWidth={1} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 30px rgba(227,24,45,0.5))', marginBottom: '1rem' }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', textAlign: 'center', fontFamily: 'monospace' }}>[ vision_skyline.jpg ]</p>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', textAlign: 'center', fontFamily: 'var(--font-main)', letterSpacing: '0.05em' }}>
                                PROPOSED IMAGE: Dhaka Skyline Wireframe (Connecting Anwar 500W GP Steel)
                            </p>
                        </div>
                    </div>

                    {/* Right: Vision text */}
                    <div className="fade-in-element" style={{ flex: '1 1 500px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Compass color="var(--accent)" size={24} />
                            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>OUR VISION</h2>
                        </div>
                        <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text)', marginBottom: '2rem', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
                            BUILDING THE FUTURE SKYLINE
                        </h3>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.15rem', lineHeight: 1.8 }}>
                            To serve as the unyielding foundation of Bangladesh's infrastructure, pioneering advanced metallurgy to support high-rises, bridges, and industrial mega-projects that stand safely for generations. We envision a safer tomorrow engineered through constant structural innovation.
                        </p>
                    </div>
                </div>
            </section>

            {/* MISSION SECTION */}
            <section className="vision-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <p className="fade-in-element" style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            HOW WE FORGE
                        </p>
                        <h2 className="fade-in-element" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                            OUR MISSION
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        
                        {/* Card 1 */}
                        <div className="fade-in-element mission-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2.5rem', borderRadius: '16px', transition: 'border-color 0.3s ease' }}>
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--glass-border)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    src="/images/mission_tech.jpg" 
                                    alt="Advanced Belgian Tempcore Technology" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Flame size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '6px', fontSize: '0.75rem', color: '#fff', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                                    PROPOSED IMAGE: Belgium Tempcore Thermo-Processing
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                                PIONEERING TECHNOLOGY
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                We are committed to importing and implementing the world's most advanced steel technologies (like Belgium's patented TMT reinforcement process) directly to the local market.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="fade-in-element mission-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2.5rem', borderRadius: '16px', transition: 'border-color 0.3s ease' }}>
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--glass-border)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    src="/images/mission_safety.jpg" 
                                    alt="BUET Lab Spectrometer Testing" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Shield size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '6px', fontSize: '0.75rem', color: '#fff', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                                    PROPOSED IMAGE: Computerized spectrometer chemistry analysis
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                                COMPLIANCE & SAFETY
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Every steel rebar must undergo 28-element chemical spectrometer and mechanical testing to guarantee 100% compliance with strict BNBC, BSTI, and international engineering criteria.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="fade-in-element mission-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2.5rem', borderRadius: '16px', transition: 'border-color 0.3s ease' }}>
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--glass-border)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    src="/images/mission_ductility.jpg" 
                                    alt="Seismic Ductility Testing" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Compass size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '6px', fontSize: '0.75rem', color: '#fff', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                                    PROPOSED IMAGE: Mechanical testing of high bendability & elongation
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                                SEISMIC DUCTILITY
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Engineering ductile steel structures capable of absorbing energy and surviving earthquakes, keeping the expanding cities of Bangladesh safe.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="vision-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <p className="fade-in-element" style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            OUR ALLOY
                        </p>
                        <h2 className="fade-in-element" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                            CORE VALUES
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* Value 1 */}
                        <div className="fade-in-element value-row" style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderLeft: '4px solid var(--accent)', borderRadius: '8px', padding: '2.5rem', gap: '2rem' }}>
                            <div style={{ flex: '1 1 250px' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                                    IRONCLAD INTEGRITY
                                </h3>
                                <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.5rem' }}>// UNBREAKABLE RELATIONSHIPS</p>
                            </div>
                            <div style={{ flex: '2 1 500px', display: 'flex', alignItems: 'center' }}>
                                <p style={{ color: 'var(--subtext)', margin: 0, lineHeight: 1.6 }}>
                                    Just like the products we manufacture, our partnerships are built on truth, trust, and absolute metallurgy specifications. We do not compromise on structural promises.
                                </p>
                            </div>
                        </div>

                        {/* Value 2 */}
                        <div className="fade-in-element value-row" style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderLeft: '4px solid var(--accent)', borderRadius: '8px', padding: '2.5rem', gap: '2rem' }}>
                            <div style={{ flex: '1 1 250px' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                                    TEMPERED INNOVATION
                                </h3>
                                <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.5rem' }}>// ADAPTING METALLURGY</p>
                            </div>
                            <div style={{ flex: '2 1 500px', display: 'flex', alignItems: 'center' }}>
                                <p style={{ color: 'var(--subtext)', margin: 0, lineHeight: 1.6 }}>
                                    We constantly temper our processes, machinery, and software controls to deliver customized high-grade rebar configurations required by modern architects.
                                </p>
                            </div>
                        </div>

                        {/* Value 3 */}
                        <div className="fade-in-element value-row" style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderLeft: '4px solid var(--accent)', borderRadius: '8px', padding: '2.5rem', gap: '2rem' }}>
                            <div style={{ flex: '1 1 250px' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                                    DUCTILE RESILIENCE
                                </h3>
                                <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.5rem' }}>// ABSORBING STRESS</p>
                            </div>
                            <div style={{ flex: '2 1 500px', display: 'flex', alignItems: 'center' }}>
                                <p style={{ color: 'var(--subtext)', margin: 0, lineHeight: 1.6 }}>
                                    We embrace changes, challenges, and industrial updates with ductility. Our teams, operations, and services are resilient under economic or structural stresses.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Custom styling scoped for hover glows */}
            <style>{`
                .mission-card:hover {
                    border-color: var(--accent) !important;
                    box-shadow: 0 10px 30px rgba(227, 24, 45, 0.1);
                    transform: translateY(-5px);
                }
                .mission-card {
                    transition: all 0.3s ease !important;
                }
                .value-row:hover {
                    background: rgba(227, 24, 45, 0.03) !important;
                    box-shadow: inset 0 0 20px rgba(227, 24, 45, 0.05);
                }
                .value-row {
                    transition: all 0.3s ease !important;
                }
            `}</style>
        </div>
    );
};

export default VisionMissionPage;
