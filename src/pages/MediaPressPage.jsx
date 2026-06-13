import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

const MediaPressPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
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

        const sections = gsap.utils.toArray('.press-section');
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
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', padding: '0 0 150px 0', overflowX: 'hidden', position: 'relative' }}>
            
            {/* Ambient glows */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(227,24,45,0.08) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', top: '40%', right: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,106,0,0.06) 0%, transparent 65%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // Corporate Declarations
                    </p>
                    <RevealText 
                        text="OFFICIAL PRESS" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="AND ANNOUNCEMENTS." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                    <div className="hero-desc" style={{ maxWidth: '750px', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderLeft: '4px solid var(--accent)', padding: '2rem', borderRadius: '0 12px 12px 0', borderTop: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.2rem', lineHeight: 1.8, margin: 0 }}>
                            Access official statements, logo materials, and press kits issued by the Anwar Group of Industries board of directors.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRESS RELEASES DETAILS */}
            <section className="press-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
                    
                    {/* Left: Press doc image placeholder */}
                    <div className="fade-in-element" style={{ flex: '1 1 450px', position: 'relative', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                        <img 
                            src="/images/media_press_doc.jpg" 
                            alt="Official corporate press release scan paper" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div style={{ position: 'absolute', inset: 0, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <Newspaper size={100} strokeWidth={1} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', textAlign: 'center', fontFamily: 'monospace' }}>[ media_press_doc.jpg ]</p>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', textAlign: 'center', fontFamily: 'var(--font-main)' }}>
                                PROPOSED IMAGE: Scan copy of the official declaration letter on steel grade upgrades
                            </p>
                        </div>
                    </div>

                    {/* Right: Press release details */}
                    <div className="fade-in-element" style={{ flex: '1 1 500px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Newspaper color="var(--accent)" size={24} />
                            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>OFFICIAL RELEASE</h2>
                        </div>
                        <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text)', marginBottom: '2rem', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
                            STEEL GRADE UPGRADE CERTIFICATE
                        </h3>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.15rem', lineHeight: 1.8 }}>
                            Anwar Ispat declares the final certification parameters of our 500W-grade rebars, conforming to the latest BNBC standards. Download our corporate media kits containing logo files, test declarations, and executive photos.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MediaPressPage;
