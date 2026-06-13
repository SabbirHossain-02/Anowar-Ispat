import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, CheckCircle2, Milestone } from 'lucide-react';

const gsapCore = gsap;
gsapCore.registerPlugin(ScrollTrigger);

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

const AwardsPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Hero Reveal
        const heroTl = gsapCore.timeline();
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

        // Sections parallax
        const sections = gsapCore.utils.toArray('.awards-section');
        sections.forEach((sec) => {
            gsapCore.fromTo(sec.querySelectorAll('.fade-in-element'),
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

        // Ambient orbs
        gsapCore.to('.ambient-orb', {
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
            <div className="ambient-orb" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(227,24,45,0.1) 0%, transparent 65%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ambient-orb" style={{ position: 'absolute', top: '40%', right: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 65%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* HERO SECTION */}
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '15vh', position: 'relative', zIndex: 2, paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <p className="hero-subtitle" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        // Verified Standards & Accolades
                    </p>
                    <RevealText 
                        text="TEMPERED IN" 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, color: 'var(--text)' }} 
                    />
                    <RevealText 
                        text="EXCELLENCE." 
                        className="hero-title" 
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--subtext)' }} 
                    />
                    <div className="hero-desc" style={{ maxWidth: '750px', background: 'var(--glass)', backdropFilter: 'blur(20px)', borderBottom: '4px solid var(--accent)', padding: '2rem', borderRadius: '12px', borderTop: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', borderLeft: '1px solid var(--glass-border)' }}>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.2rem', lineHeight: 1.8, margin: 0 }}>
                            Anwar Ispat maintains compliance with global standards, receiving recognition from national regulatory agencies, engineering associations, and environmental forums.
                        </p>
                    </div>
                </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <section className="awards-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <p className="fade-in-element" style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            METALLURGY COMPLIANCE
                        </p>
                        <h2 className="fade-in-element" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                            CERTIFICATIONS
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        
                        {/* Cert 1 */}
                        <div className="fade-in-element cert-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '140px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '1.2rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/cert_bsti.jpg" 
                                    alt="BSTI Compliance Standard seal" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <ShieldCheck size={40} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '4px', fontSize: '0.7rem', color: '#fff' }}>
                                    [ cert_bsti.jpg - BSTI Seal ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>BSTI COMPLIANT</h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                Certified by Bangladesh Standards and Testing Institution, meeting all chemical and structural requirements for reinforcement bars.
                            </p>
                        </div>

                        {/* Cert 2 */}
                        <div className="fade-in-element cert-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '140px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '1.2rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/cert_iso.jpg" 
                                    alt="ISO 9001 Certificate" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <CheckCircle2 size={40} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '4px', fontSize: '0.7rem', color: '#fff' }}>
                                    [ cert_iso.jpg - ISO Stamp ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>ISO 9001:2015</h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                International Quality Management System certification, verifying precise computerized control from furnace melting to billet sizing.
                            </p>
                        </div>

                        {/* Cert 3 */}
                        <div className="fade-in-element cert-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '140px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '1.2rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/cert_tempcore.jpg" 
                                    alt="Belgian Tempcore License Stamp" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <Award size={40} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '4px', fontSize: '0.7rem', color: '#fff' }}>
                                    [ cert_tempcore.jpg - Tempcore Stamp ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>BELGIAN TEMPCORE</h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                Authorized Tempcore manufacturer license, utilizing patented Belgian thermal treatment technologies for seismic ductility.
                            </p>
                        </div>

                        {/* Cert 4 */}
                        <div className="fade-in-element cert-card" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '140px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '1.2rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/cert_buet.jpg" 
                                    alt="BUET Lab Test Verification Document" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <Milestone size={40} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '4px', fontSize: '0.7rem', color: '#fff' }}>
                                    [ cert_buet.jpg - BUET Report ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>BUET APPROVED</h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                Extensively tested and approved by Bangladesh University of Engineering and Technology (BUET) structural laboratories.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* AWARDS GALLERY SECTION */}
            <section className="awards-section" style={{ position: 'relative', zIndex: 2, padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <p className="fade-in-element" style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            NATIONAL ACCOLADES
                        </p>
                        <h2 className="fade-in-element" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                            THE HALL OF IRON
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        
                        {/* Award Slot 1 */}
                        <div className="fade-in-element award-slot-card" style={{ position: 'relative', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2.5rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div className="metallic-glint" />
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/award_brand.jpg" 
                                    alt="Best Brand Award Certificate and Trophy" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <Award size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '5px', fontSize: '0.75rem', color: '#fff' }}>
                                    [ award_brand.jpg - BBF Trophy ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>
                                BEST BRAND AWARD
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                Awarded multiple times in the steel category by Bangladesh Brand Forum, celebrating trust and top-of-mind brand recall.
                            </p>
                        </div>

                        {/* Award Slot 2 */}
                        <div className="fade-in-element award-slot-card" style={{ position: 'relative', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2.5rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div className="metallic-glint" />
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/award_tax.jpg" 
                                    alt="National Tax Award Plaque" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <Award size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '5px', fontSize: '0.75rem', color: '#fff' }}>
                                    [ award_tax.jpg - NBR Plaque ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>
                                NATIONAL TAX AWARD
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                Anwar Group has repeatedly received recognition from the National Board of Revenue (NBR) as a top tax-paying industrial group.
                            </p>
                        </div>

                        {/* Award Slot 3 */}
                        <div className="fade-in-element award-slot-card" style={{ position: 'relative', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2.5rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div className="metallic-glint" />
                            <div style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <img 
                                    src="/images/award_green.jpg" 
                                    alt="Green Industry Environment Award" 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <Award size={48} color="var(--accent)" />
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.85)', padding: '5px', fontSize: '0.75rem', color: '#fff' }}>
                                    [ award_green.jpg - Green Award ]
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>
                                GREEN INDUSTRY AWARD
                            </h3>
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                Commended for adopting energy-saving reheating induction systems and zero waste emission management policies in production.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Scoped styling for shine sweeps */}
            <style>{`
                .cert-card:hover {
                    border-color: var(--accent) !important;
                    box-shadow: 0 10px 25px rgba(227, 24, 45, 0.08);
                }
                .cert-card {
                    transition: all 0.3s ease !important;
                }
                .award-slot-card:hover {
                    border-color: var(--accent) !important;
                    box-shadow: 0 15px 35px rgba(227, 24, 45, 0.1);
                    transform: translateY(-4px);
                }
                .award-slot-card {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
                
                /* Glint/sweep animation effect */
                .metallic-glint {
                    position: absolute;
                    top: 0;
                    left: -150%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
                    transform: skewX(-25deg);
                    transition: none;
                }
                .award-slot-card:hover .metallic-glint {
                    left: 150%;
                    transition: left 1.2s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default AwardsPage;
