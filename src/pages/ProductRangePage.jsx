import React, { useRef, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

const GRADES = [
    {
        name: 'ANWARS 500DWR',
        tag: '500 grade · dual wire rib',
        advantages: [
            'High strength reinforcing steel',
            'Excellent elongation properties',
            'TS/YS ratio > 1.25',
            'Superior weldability',
            'More durable and weather resistant',
            'Good quality bonding with concrete',
            'Excellent bendability',
        ],
    },
    {
        name: 'ANWARS 420DWR',
        tag: '420 grade · dual wire rib',
        advantages: [
            'Suitable for earthquake resistant structures',
            'High ductility',
            'Higher energy consumption capacity',
            'ACI Code and BNBC certified',
            'Excellent durability',
        ],
    },
];


const ProductRangePage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // ── API: অ্যাডমিন থেকে যোগ করা প্রোডাক্ট ─────────────────────────
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/products')
            .then((r) => r.json())
            .then((data) => { if (!cancelled && Array.isArray(data)) setProducts(data); })
            .catch(() => {})
            .finally(() => { if (!cancelled) setLoadingProducts(false); });
        return () => { cancelled = true; };
    }, []);
    // ─────────────────────────────────────────────────────────────────

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.pr-reveal').forEach((el) => {
            gsap.from(el, {
                y: 38, opacity: 0, duration: 0.75, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 86%' },
            });
        });
    }, { scope: rootRef, dependencies: [products.length] });

    const askForQuote = () => window.dispatchEvent(new CustomEvent('open-quote'));

    const heading = (eyebrow, title) => (
        <div className="pr-reveal" style={{ marginBottom: SECTION_PAD }}>
            <span style={{
                fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.28em', color: 'var(--accent)',
            }}>
                {eyebrow}
            </span>
            <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)',
                fontWeight: 800, margin: '0.8rem 0 0', letterSpacing: '0.02em',
                textTransform: 'none',
            }}>
                {title}
            </h2>
        </div>
    );

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/product-range-banner.jpeg"
                label="PRODUCTS"
                title="Reinforcement built for"
                accent="Strength"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: 'Our Product Range' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="pr-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)', margin: 0, maxWidth: '62ch',
                }}>
                    Anwar Ispat produces deformed reinforcement bars using patented TMT technology from
                    Belgium, tested batch by batch and certified to BSTI and ISO standards.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* GRADES */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)',
            }}>
                <div style={CONTAINER}>
                    {heading('OUR GRADES', 'Two grades, two jobs')}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: 'clamp(1rem, 2vw, 1.75rem)',
                        alignItems: 'start',
                    }}>
                        {GRADES.map((g) => (
                            <article key={g.name} className="pr-reveal" style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--glass-border)',
                                borderTop: '3px solid var(--accent)',
                                borderRadius: '4px',
                                padding: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                            }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
                                    fontWeight: 800, letterSpacing: '0.03em', margin: 0,
                                }}>
                                    {g.name}
                                </h3>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.78rem',
                                    letterSpacing: '0.14em', textTransform: 'uppercase',
                                    color: 'var(--accent)', margin: '0.5rem 0 1.5rem',
                                }}>
                                    {g.tag}
                                </p>

                                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {g.advantages.map((a) => (
                                        <li key={a} style={{
                                            display: 'grid', gridTemplateColumns: '18px 1fr',
                                            gap: '0.7rem', alignItems: 'start',
                                            padding: '0.55rem 0',
                                            borderBottom: '1px solid var(--glass-border)',
                                        }}>
                                            <Check size={15} color="var(--accent)" style={{ marginTop: '0.28rem' }} />
                                            <span style={{
                                                fontFamily: 'var(--font-main)', fontSize: '0.94rem',
                                                lineHeight: 1.65, color: 'var(--subtext)',
                                            }}>
                                                {a}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={askForQuote}
                                    style={{
                                        marginTop: '1.6rem', width: '100%',
                                        background: 'var(--accent)', color: '#fff', border: 'none',
                                        padding: '0.85rem 1.5rem', borderRadius: '4px',
                                        fontFamily: 'var(--font-main)', fontSize: '0.78rem',
                                        fontWeight: 700, letterSpacing: '0.14em',
                                        textTransform: 'uppercase', cursor: 'pointer',
                                    }}
                                >
                                    Request a quotation
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>


            {/* ---------------------------------------------------------- */}
            {/* CATALOGUE — অ্যাডমিন প্যানেল থেকে যোগ করা প্রোডাক্ট */}
            {/* ---------------------------------------------------------- */}
            {(loadingProducts || products.length > 0) && (
                <section style={{
                    minHeight: 'auto', display: 'block',
                    paddingTop: SECTION_PAD,
                    paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                    paddingLeft: 0, paddingRight: 0,
                }}>
                    <div style={CONTAINER}>
                        {heading('CATALOGUE', 'From our product line')}

                        {loadingProducts ? (
                            <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', margin: 0 }}>
                                Loading products…
                            </p>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile
                                    ? 'repeat(auto-fit, minmax(260px, 1fr))'
                                    : 'repeat(3, 1fr)',
                                gap: 'clamp(1rem, 1.8vw, 1.5rem)',
                            }}>
                                {products.map((p) => (
                                    <article key={p.id} className="pr-reveal" style={{
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        background: 'var(--surface)',
                                        display: 'flex', flexDirection: 'column',
                                    }}>
                                        <div style={{
                                            aspectRatio: '4 / 3',
                                            background: 'var(--glass)',
                                            borderBottom: '1px solid var(--glass-border)',
                                        }}>
                                            <img
                                                src={p.image_url || '/product_image.png'}
                                                alt={p.title}
                                                loading="lazy"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                        </div>

                                        <div style={{ padding: 'clamp(1.1rem, 2vw, 1.5rem)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 'clamp(1.02rem, 1.5vw, 1.2rem)',
                                                fontWeight: 800, letterSpacing: '0.03em',
                                                margin: '0 0 0.6rem', textTransform: 'none',
                                            }}>
                                                {p.title}
                                            </h3>

                                            {p.description && (
                                                <p style={{
                                                    fontFamily: 'var(--font-main)', fontSize: '0.92rem',
                                                    lineHeight: 1.75, color: 'var(--subtext)',
                                                    margin: '0 0 1.2rem',
                                                }}>
                                                    {p.description}
                                                </p>
                                            )}

                                            <button
                                                onClick={askForQuote}
                                                style={{
                                                    marginTop: 'auto', alignSelf: 'flex-start',
                                                    background: 'transparent', color: 'var(--accent)',
                                                    border: '1px solid var(--accent)',
                                                    padding: '0.6rem 1.2rem', borderRadius: '4px',
                                                    fontFamily: 'var(--font-main)', fontSize: '0.74rem',
                                                    fontWeight: 700, letterSpacing: '0.12em',
                                                    textTransform: 'uppercase', cursor: 'pointer',
                                                }}
                                            >
                                                Get a quote
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductRangePage;
