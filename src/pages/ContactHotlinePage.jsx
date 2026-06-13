import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail } from 'lucide-react';

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

const ContactHotlinePage = () => {
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
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', padding: '0 0 150px 0', overflowX: 'hidden', position: 'relative' }}>
            
            {/* Ambient glows */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(227,24,45,0.08) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // Direct Hotline Support
                    </p>
                    <RevealText 
                        text="DIAL OUR STEEL" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="COMMUNICATION HUB." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                </div>
            </section>

            {/* HOTLINE DETAILS */}
            <section style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                    
                    {/* Left: Hotline card */}
                    <div style={{ flex: '1 1 500px', background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '3rem', borderRadius: '24px', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <h3 style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={20} /> CUSTOMER HOTLINE
                            </h3>
                            <p style={{ color: 'var(--text)', fontSize: '1.8rem', margin: 0, fontWeight: 800 }}>16027</p>
                            <p style={{ color: 'var(--subtext)', marginTop: '0.5rem' }}>
                                Toll-free support for order updates & logistics dispatching.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                            <h3 style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={20} /> EMAIL CHANNELS
                            </h3>
                            <p style={{ color: 'var(--text)', fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>info@anwarispat.com</p>
                            <p style={{ color: 'var(--subtext)', marginTop: '0.5rem' }}>
                                Send structural blueprints or general project bids.
                            </p>
                        </div>
                    </div>

                    {/* Right: Hotline operator image placeholder */}
                    <div style={{ flex: '1 1 450px', position: 'relative', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                        <img 
                            src="/images/contact_hotline.jpg" 
                            alt="Customer hotline operators call center" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div style={{ position: 'absolute', inset: 0, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <Phone size={100} strokeWidth={1} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', textAlign: 'center', fontFamily: 'monospace' }}>[ contact_hotline.jpg ]</p>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', textAlign: 'center', fontFamily: 'var(--font-main)' }}>
                                PROPOSED IMAGE: In-house dispatch operator desk answering client hotlines
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactHotlinePage;
