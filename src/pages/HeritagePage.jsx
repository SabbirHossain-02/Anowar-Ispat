import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
// ঘটনাক্রম src/lib/heritage.js এ — About পেজেও একই তালিকা লাগে
import { ERAS } from '../lib/heritage';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

// ২৯টি মাইলফলক একটানা তালিকায় দিলে কেউ পড়ে না। তাই যুগ অনুযায়ী
// চার ভাগে ভাগ করা — প্রতিটি ভাগ নিজেই একটা গল্প বলে।

const HeritagePage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.hr-reveal').forEach((el) => {
            gsap.from(el, {
                y: 34, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            });
        });
    }, { scope: rootRef });

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/heritage-banner.jpeg"
                label="HERITAGE"
                title="Nearly two centuries of"
                accent="Building"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'About us', to: '/about' },
                    { label: 'Heritage' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="hr-reveal" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                    fontWeight: 700, lineHeight: 1.45, letterSpacing: '0.01em',
                    color: 'var(--text)', margin: 0, maxWidth: '30ch',
                    textTransform: 'none',
                }}>
                    A legacy to value and enjoy in the present, and to preserve and pass on to
                    future generations.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* TIMELINE */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: 0,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    {ERAS.map((era) => (
                        <div key={era.span} style={{ paddingTop: SECTION_PAD }}>
                            {/* যুগের শিরোনাম — ডেস্কটপে স্ক্রলের সাথে আটকে থাকে,
                                তাই লম্বা তালিকা পড়ার সময়ও কোন যুগ চলছে বোঝা যায় */}
                            <div
                                className="hr-reveal"
                                style={{
                                    position: isMobile ? 'static' : 'sticky',
                                    top: '92px',
                                    zIndex: 3,
                                    background: 'var(--primary)',
                                    paddingBottom: '1.1rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <span style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.74rem', fontWeight: 700,
                                    letterSpacing: '0.2em', color: 'var(--accent)',
                                }}>
                                    {era.span}
                                </span>
                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                                    fontWeight: 800, letterSpacing: '0.02em',
                                    margin: '0.5rem 0 0.55rem', textTransform: 'none',
                                }}>
                                    {era.title}
                                </h2>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.92rem',
                                    lineHeight: 1.7, color: 'var(--subtext)', margin: 0, maxWidth: '58ch',
                                }}>
                                    {era.note}
                                </p>
                            </div>

                            {era.events.map((e, i) => (
                                <div
                                    key={`${e.year}-${e.name}`}
                                    className="hr-reveal hr-row"
                                    style={{ gridTemplateColumns: isMobile ? '64px 1fr' : '104px 1fr' }}
                                >
                                    <span className="hr-year">{e.year}</span>

                                    <div className="hr-entry">
                                        <h3 className={`hr-name${e.highlight ? ' hr-name-accent' : ''}`}>
                                            {e.name}
                                        </h3>
                                        <p className="hr-text">{e.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HeritagePage;
