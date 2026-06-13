import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldAlert, AwardIcon, Landmark } from 'lucide-react';

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

// HELPER: Magnetic 3D Card
const MagneticCard = ({ children, className, style }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(cardRef.current, {
            rotationY: x * 0.04,
            rotationX: -y * 0.04,
            transformPerspective: 1200,
            ease: "power2.out",
            duration: 0.6
        });
        
        const img = cardRef.current.querySelector('.pop-out-img');
        if (img) {
            gsap.to(img, {
                x: x * 0.08,
                y: y * 0.08,
                scale: 1.03,
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

const LeadershipPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Hero animation
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

        // Sections parallax entrance
        const sections = gsap.utils.toArray('.cinematic-section');
        sections.forEach((sec) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sec,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(sec.querySelector('.glass-card-bg'),
                { opacity: 0, scale: 0.96, y: 40, filter: 'blur(15px)' },
                { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: "power3.out" }
            );

            const words = sec.querySelectorAll('.sec-title .reveal-word');
            if (words.length > 0) {
                tl.fromTo(words, 
                    { y: '120%', rotationX: 45 },
                    { y: '0%', rotationX: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" },
                    "-=0.8"
                );
            }
        });

        // Orbs Parallax
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
            
            {/* Ambient Molten Background Glowing Orbs */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(227,24,45,0.1) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', top: '45%', right: '-15%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 65%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // The Architects of Legacy
                    </p>
                    <RevealText 
                        text="STEERING THE" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="LEGACY FORCE." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                    <div className="hero-desc" style={{ maxWidth: '750px', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderBottom: '4px solid var(--accent)', padding: '2rem', borderRadius: '12px', borderTop: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', borderLeft: '1px solid var(--glass-border)' }}>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.2rem', lineHeight: 1.8, margin: 0 }}>
                            Anwar Ispat is guided by visionary business leaders who combine the values of a century-old conglomerate with cutting-edge engineering innovation to build the nation's future.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOUNDER TRIBUTE SECTION */}
            <section className="cinematic-section" style={{ position: 'relative', zIndex: 3, padding: '5rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card-bg" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', background: 'var(--glass)', backdropFilter: 'blur(30px)', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', width: '100%', maxWidth: '1200px', overflow: 'hidden' }}>
                    
                    {/* Portrait Frame */}
                    <div style={{ flex: '1 1 450px', position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', borderRight: '1px solid var(--glass-border)' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(227,24,45,0.15) 0%, transparent 75%)', zIndex: 0 }} />
                        <img 
                            src="/founder.webp" 
                            alt="Late Anwar Hossain" 
                            style={{ width: '80%', height: 'auto', maxHeight: '380px', objectFit: 'contain', filter: 'grayscale(100%) contrast(1.15)', borderRadius: '12px', border: '1px solid var(--glass-border)', zIndex: 1 }}
                            onError={(e) => {
                                // fallback if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <div className="fallback-icon" style={{ display: 'none', zIndex: 1 }}>
                            <Landmark size={120} strokeWidth={1} color="var(--accent)" />
                        </div>
                        <div className="caption-label" style={{ marginTop: '1.5rem', zIndex: 1, textAlign: 'center', borderRadius: '8px' }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                                TARGET IMAGE: Late Anwar Hossain (Founder, Anwar Group)
                            </p>
                        </div>
                    </div>
 
                    {/* Text Details */}
                    <div style={{ flex: '1 1 550px', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                        <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem' }}>// THE FOUNDING ALLOY</p>
                        <RevealText text="LATE ANWAR HOSSAIN" className="sec-title" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.0, fontWeight: 800 }} />
                        <h4 style={{ color: 'var(--subtext)', fontSize: '1.1rem', marginBottom: '2rem', fontStyle: 'italic', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.8rem' }}>
                            Founder, Anwar Group of Industries
                        </h4>
                        <p style={{ color: 'var(--subtext)', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
                            A legendary industrialist who laid the foundations of trust, ethics, and premium quality in the steel market. Under his guiding philosophy, Anwar Ispat pioneered 60-Grade reinforcement steel in Bangladesh in 1978. His legacy represents the unyielding strength behind our values.
                        </p>
                    </div>
                </div>
            </section>
 
            {/* EXECUTIVE BOARD SECTION */}
            <section style={{ position: 'relative', zIndex: 3, padding: '4rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        EXECUTIVE LEADERSHIP
                    </p>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                        BOARD OF DIRECTORS
                    </h2>
                </div>
 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    
                    {/* Chairman: Manwar Hossain */}
                    <div className="cinematic-section">
                        <MagneticCard style={{ height: '100%' }}>
                            <div className="glass-card-bg" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ height: '350px', width: '100%', position: 'relative', pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingTop: '2rem' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'radial-gradient(ellipse at bottom, rgba(227,24,45,0.15) 0%, transparent 80%)' }} />
                                    <img 
                                        src="/Manwar-Hossain-transparent-1by1-ar.png" 
                                        alt="Manwar Hossain" 
                                        className="pop-out-img"
                                        style={{ height: '90%', width: 'auto', objectFit: 'contain', zIndex: 1 }} 
                                        onError={(e) => { e.target.src = '/md.webp'; }}
                                    />
                                </div>
                                <div className="card-details" style={{ padding: '2.5rem 2rem', flexGrow: 1, zIndex: 10, borderRadius: '0 0 20px 20px', borderTop: '1px solid var(--glass-border)' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>MANWAR HOSSAIN</h3>
                                    <p style={{ color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '1.2rem', fontSize: '0.85rem' }}>// CHAIRMAN, ANWAR GROUP</p>
                                    <p style={{ color: 'var(--subtext)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                                        Succeeding Late Anwar Hossain in September 2021. An MBA from the University of New Hampshire, USA, he joined the business in 1993, expanding the group's manufacturing footprint with modern strategic direction.
                                    </p>
                                </div>
                            </div>
                        </MagneticCard>
                    </div>
 
                    {/* DMD: Furkaan N Hossain */}
                    <div className="cinematic-section">
                        <MagneticCard style={{ height: '100%' }}>
                            <div className="glass-card-bg" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ height: '350px', width: '100%', position: 'relative', pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingTop: '2rem' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'radial-gradient(ellipse at bottom, rgba(227,24,45,0.15) 0%, transparent 80%)' }} />
                                    <img 
                                        src="/Furkaan-Hossain-transparent-1by1-ar.png" 
                                        alt="Furkaan N Hossain" 
                                        className="pop-out-img"
                                        style={{ height: '90%', width: 'auto', objectFit: 'contain', zIndex: 1 }} 
                                        onError={(e) => { e.target.src = '/md.webp'; }}
                                    />
                                </div>
                                <div className="card-details" style={{ padding: '2.5rem 2rem', flexGrow: 1, zIndex: 10, borderRadius: '0 0 20px 20px', borderTop: '1px solid var(--glass-border)' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>FURKAAN N HOSSAIN</h3>
                                    <p style={{ color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '1.2rem', fontSize: '0.85rem' }}>// DEPUTY MANAGING DIRECTOR</p>
                                    <p style={{ color: 'var(--subtext)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                                        Oversees manufacturing operations and leads the Building Material Division. An engineering and Computer Science graduate from Colorado State University, he champions technologies and digital transformation across the group.
                                    </p>
                                </div>
                            </div>
                        </MagneticCard>
                    </div>
 
                    {/* DMD: Waeez R Hossain */}
                    <div className="cinematic-section">
                        <MagneticCard style={{ height: '100%' }}>
                            <div className="glass-card-bg" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ height: '350px', width: '100%', position: 'relative', pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingTop: '2rem' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'radial-gradient(ellipse at bottom, rgba(227,24,45,0.15) 0%, transparent 80%)' }} />
                                    <img 
                                        src="/Waeez-R-Hossain-transparent-1by1-ar.png" 
                                        alt="Waeez R Hossain" 
                                        className="pop-out-img"
                                        style={{ height: '90%', width: 'auto', objectFit: 'contain', zIndex: 1 }} 
                                        onError={(e) => { e.target.src = '/md.webp'; }}
                                    />
                                </div>
                                <div className="card-details" style={{ padding: '2.5rem 2rem', flexGrow: 1, zIndex: 10, borderRadius: '0 0 20px 20px', borderTop: '1px solid var(--glass-border)' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>WAEEZ R HOSSAIN</h3>
                                    <p style={{ color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '1.2rem', fontSize: '0.85rem' }}>// DEPUTY MANAGING DIRECTOR</p>
                                    <p style={{ color: 'var(--subtext)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                                        DMD of Building Materials, directing marketing and market expansions. With an MBA from Georgetown University McDonough School of Business, he manages division efficiency, scaling manufacturing outputs safely.
                                    </p>
                                </div>
                            </div>
                        </MagneticCard>
                    </div>
 
                </div>
                </div>
            </section>
 
            {/* Custom styling for light/dark theme adaptation in LeadershipPage */}
            <style>{`
                .card-details {
                    background: rgba(0, 0, 0, 0.4);
                    transition: all 0.3s ease;
                }
                body.light-mode .card-details {
                    background: rgba(255, 255, 255, 0.95) !important;
                    border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
                }
                body.light-mode .glass-card-bg {
                    background: rgba(255, 255, 255, 0.8) !important;
                    border-color: rgba(0, 0, 0, 0.1) !important;
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.05) !important;
                }
                body.light-mode .pop-out-img {
                    filter: none !important;
                }
                body.light-mode .fallback-icon {
                    color: var(--accent) !important;
                }
                .caption-label {
                    background: rgba(0, 0, 0, 0.85);
                    border: 1px solid var(--glass-border);
                    padding: 0.5rem 1rem;
                    transition: all 0.3s ease;
                }
                .caption-label p {
                    color: #fff;
                    transition: all 0.3s ease;
                }
                body.light-mode .caption-label {
                    background: rgba(0, 0, 0, 0.05) !important;
                    border-color: rgba(0, 0, 0, 0.1) !important;
                }
                body.light-mode .caption-label p {
                    color: var(--text) !important;
                }
            `}</style>
        </div>
    );
};

export default LeadershipPage;
