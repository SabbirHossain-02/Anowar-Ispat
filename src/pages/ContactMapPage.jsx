import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';

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

const ContactMapPage = () => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', padding: '0 0 150px 0', overflowX: 'hidden', position: 'relative' }}>
            
            {/* Ambient glows */}
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(227,24,45,0.08) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // Geographic Coordinates
                    </p>
                    <RevealText 
                        text="INTERACTIVE ROUTE" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="MAP COMPASS." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                </div>
            </section>

            {/* MAP LAYOUT */}
            <section style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                    
                    {/* Left: Map Description */}
                    <div style={{ flex: '1 1 400px', background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '3rem', borderRadius: '24px', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', margin: 0 }}>GEOGRAPHIC PIN</h3>
                        <p style={{ color: 'var(--text)', fontSize: '1.10rem', lineHeight: 1.6, margin: 0, fontWeight: 700 }}>
                            Anwar Ispat Factory Sonargaon Yard
                        </p>
                        <p style={{ color: 'var(--subtext)', lineHeight: 1.6, margin: 0 }}>
                            Located along the Dhaka-Chittagong Highway in Kachpur, Narayanganj. Ideal transportation links for delivering heavy cargo shipments globally.
                        </p>
                    </div>

                    {/* Right: Map image placeholder */}
                    <div style={{ flex: '2 1 600px', position: 'relative', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', minHeight: '350px' }}>
                        <img 
                            src="/images/contact_map.jpg" 
                            alt="Sonargaon Narayanganj factory location map screenshot" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div style={{ position: 'absolute', inset: 0, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <MapPin size={100} strokeWidth={1} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', textAlign: 'center', fontFamily: 'monospace' }}>[ contact_map.jpg ]</p>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.85)', padding: '0.75rem 1rem', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', textAlign: 'center', fontFamily: 'var(--font-main)' }}>
                                PROPOSED IMAGE: Google Map embed showingSonargaon Factory Route Coordinates
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactMapPage;
