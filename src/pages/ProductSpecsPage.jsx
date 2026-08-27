import React, { useRef, useState, useEffect } from 'react';
import { Layers, Grid3x3, Building } from 'lucide-react';
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

const APPLICATIONS = [
    {
        icon: Layers,
        name: 'Piling foundation',
        text: 'Deep foundation cages where corrosion resistance and bond strength decide the life of the structure.',
    },
    {
        icon: Grid3x3,
        name: 'Slab construction',
        text: 'Mesh and distribution bars, where bendability and consistent diameter keep placement fast and accurate.',
    },
    {
        icon: Building,
        name: 'Constructing pillars',
        text: 'Columns carrying the load of the building, where yield strength and ductility matter most.',
    },
];

// স্লাইডের টেবিলটি প্রতিটি গ্রেডের নিচে দুই কলামে সাইজ সাজিয়ে রেখেছিল।
// গ্রেড অনুযায়ী এক সারিতে আনলে তুলনা করা সহজ, আর 420DWR এ ৮ মি.মি. যে
// নেই সেটাও চোখে পড়ে — টেবিলে ওটা কেবল একটা ফাঁকা ঘর ছিল।
const SIZES = [
    { grade: '500CWR', mm: [8, 10, 12, 16, 20, 22, 25, 28, 32, 40] },
    { grade: '500DWR', mm: [8, 10, 12, 16, 20, 22, 25, 28, 32, 40] },
    { grade: '420DWR', mm: [10, 12, 16, 20, 22, 25, 28, 32, 40] },
];

const ALL_SIZES = [8, 10, 12, 16, 20, 22, 25, 28, 32, 40];

const ProductSpecsPage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.ps-reveal').forEach((el) => {
            gsap.from(el, {
                y: 38, opacity: 0, duration: 0.75, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 86%' },
            });
        });
    }, { scope: rootRef });

    const heading = (eyebrow, title) => (
        <div className="ps-reveal" style={{ marginBottom: SECTION_PAD }}>
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
                image="/Product-Specifications.jpeg"
                label="PRODUCT SPECIFICATIONS"
                title="Built for"
                accent="Strength"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: 'Product Specifications' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="ps-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)', margin: 0, maxWidth: '62ch',
                }}>
                    Every batch is tested on a spectrometer across 28 elements before it leaves the mill,
                    to hold the tolerances that piling, slabs and columns are designed against.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* APPLICATIONS */}
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
                    {heading('APPLICATIONS', 'Where the bar goes')}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                    }}>
                        {APPLICATIONS.map(({ icon: Icon, name, text }) => (
                            <div key={name} className="ps-reveal" style={{
                                paddingTop: '1.35rem',
                                borderTop: '2px solid var(--accent)',
                            }}>
                                <Icon size={24} color="var(--accent)" />
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                                    fontWeight: 800, letterSpacing: '0.03em',
                                    margin: '0.9rem 0 0.6rem', textTransform: 'none',
                                }}>
                                    {name}
                                </h3>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.93rem',
                                    lineHeight: 1.78, color: 'var(--subtext)', margin: 0,
                                }}>
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* SIZE TABLE */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    {heading('SIZE CHART', 'Available diameters')}

                    {/* চওড়া টেবিল যেন পুরো পেজ পাশে ঠেলে না দেয়, তাই নিজের
                        ভেতরেই স্ক্রল করে */}
                    <div className="ps-reveal" style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%', minWidth: '640px',
                            borderCollapse: 'collapse',
                            fontFamily: 'var(--font-main)',
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        textAlign: 'left', padding: '0.85rem 1rem',
                                        fontSize: '0.72rem', fontWeight: 700,
                                        letterSpacing: '0.16em', textTransform: 'uppercase',
                                        color: 'var(--subtext)',
                                        borderBottom: '1px solid var(--glass-border)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        Diameter
                                    </th>
                                    {SIZES.map(({ grade }) => (
                                        <th key={grade} style={{
                                            padding: '0.85rem 1rem',
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '0.95rem', fontWeight: 800,
                                            letterSpacing: '0.04em',
                                            color: '#fff',
                                            background: 'var(--accent)',
                                            borderBottom: '1px solid var(--glass-border)',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {grade}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ALL_SIZES.map((d) => (
                                    <tr key={d}>
                                        <td style={{
                                            padding: '0.8rem 1rem',
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '0.92rem', fontWeight: 800,
                                            letterSpacing: '0.03em',
                                            borderBottom: '1px solid var(--glass-border)',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {d} mm
                                        </td>
                                        {SIZES.map(({ grade, mm }) => (
                                            <td key={grade} style={{
                                                padding: '0.8rem 1rem',
                                                textAlign: 'center',
                                                fontSize: '0.9rem',
                                                color: mm.includes(d) ? 'var(--accent)' : 'var(--subtext)',
                                                borderBottom: '1px solid var(--glass-border)',
                                            }}>
                                                {mm.includes(d) ? 'Available' : '—'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p style={{
                        fontFamily: 'var(--font-main)', fontSize: '0.85rem',
                        color: 'var(--subtext)', margin: '1.4rem 0 0', maxWidth: '62ch',
                    }}>
                        420DWR is not produced in 8 mm. For any diameter or quantity, send us the
                        requirement and we will confirm availability.
                    </p>

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
                        style={{
                            marginTop: '1.5rem',
                            background: 'var(--accent)', color: '#fff', border: 'none',
                            padding: '0.85rem 1.9rem', borderRadius: '4px',
                            fontFamily: 'var(--font-main)', fontSize: '0.78rem',
                            fontWeight: 700, letterSpacing: '0.14em',
                            textTransform: 'uppercase', cursor: 'pointer',
                        }}
                    >
                        Request a quotation
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductSpecsPage;
