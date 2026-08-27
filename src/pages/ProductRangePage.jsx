import React, { useRef, useState, useEffect } from 'react';
import { Check, Layers, Grid3x3, Building } from 'lucide-react';
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

// স্লাইডের টেবিলটি প্রতিটি গ্রেডের জন্য দুই কলামে সাল সাজানো ছিল;
// এখানে গ্রেড অনুযায়ী এক সারিতে আনা হয়েছে, পড়তে সহজ হয়।
// 420DWR এ ৮ মি.মি. নেই — টেবিলে ওই ঘরটি ফাঁকা ছিল।
const SIZES = [
    { grade: '500CWR', mm: [8, 10, 12, 16, 20, 22, 25, 28, 32, 40] },
    { grade: '500DWR', mm: [8, 10, 12, 16, 20, 22, 25, 28, 32, 40] },
    { grade: '420DWR', mm: [10, 12, 16, 20, 22, 25, 28, 32, 40] },
];

const APPLICATIONS = [
    { icon: Layers, name: 'Piling foundation' },
    { icon: Grid3x3, name: 'Slab construction' },
    { icon: Building, name: 'Constructing pillars' },
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
            {/* APPLICATIONS */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    {heading('WHERE IT GOES', 'Built for strength')}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 'clamp(1rem, 2vw, 1.75rem)',
                    }}>
                        {APPLICATIONS.map(({ icon: Icon, name }) => (
                            <div key={name} className="pr-reveal" style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1.15rem 0',
                                borderTop: '1px solid var(--glass-border)',
                            }}>
                                <Icon size={22} color="var(--accent)" />
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                    fontWeight: 800, letterSpacing: '0.03em',
                                    textTransform: 'none',
                                }}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* SIZES */}
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
                    {heading('SPECIFICATIONS', 'Available diameters')}

                    {SIZES.map(({ grade, mm }) => (
                        <div key={grade} className="pr-reveal" style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '150px 1fr',
                            gap: isMobile ? '0.75rem' : '1.5rem',
                            alignItems: 'center',
                            padding: '1.15rem 0',
                            borderTop: '1px solid var(--glass-border)',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                fontWeight: 800, letterSpacing: '0.04em',
                            }}>
                                {grade}
                            </span>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mm.map((d) => (
                                    <span key={d} style={{
                                        fontFamily: 'var(--font-main)', fontSize: '0.82rem',
                                        fontWeight: 600, color: 'var(--text)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '3px',
                                        padding: '0.35rem 0.7rem',
                                        background: 'var(--primary)',
                                    }}>
                                        {d} mm
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <p style={{
                        fontFamily: 'var(--font-main)', fontSize: '0.85rem',
                        color: 'var(--subtext)', margin: '1.4rem 0 0',
                        paddingTop: '1.15rem', borderTop: '1px solid var(--glass-border)',
                    }}>
                        420DWR is not produced in 8 mm. For any size or quantity, send us the
                        requirement and we will confirm availability.
                    </p>
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
