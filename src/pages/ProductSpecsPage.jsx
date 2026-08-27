import React, { useRef, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
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
        image: '/app-piling.jpg',
        name: 'Piling foundation',
        text: 'Deep foundation cages where corrosion resistance and bond strength decide the life of the structure.',
    },
    {
        image: '/app-slab.jpg',
        name: 'Slab construction',
        text: 'Mesh and distribution bars, where bendability and consistent diameter keep placement fast and accurate.',
    },
    {
        image: '/app-pillars.jpg',
        name: 'Constructing pillars',
        text: 'Columns carrying the load of the building, where yield strength and ductility matter most.',
    },
];

const GRADES = ['500CWR', '500DWR', '420DWR'];

// স্লাইডের টেবিলের হুবহু গঠন — প্রতিটি গ্রেডের নিচে দুই কলামে সাইজ।
// 420DWR এর প্রথম ঘরটি ফাঁকা, ওই গ্রেডে ৮ মি.মি. তৈরি হয় না।
const SIZE_ROWS = [
    { '500CWR': [8, 10], '500DWR': [8, 10], '420DWR': [null, 10] },
    { '500CWR': [12, 16], '500DWR': [12, 16], '420DWR': [12, 16] },
    { '500CWR': [20, 22], '500DWR': [20, 22], '420DWR': [20, 22] },
    { '500CWR': [25, 28], '500DWR': [25, 28], '420DWR': [25, 28] },
    { '500CWR': [32, 40], '500DWR': [32, 40], '420DWR': [32, 40] },
];

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

    // টেবিলের ঘরে ক্লিক করলে ওই গ্রেড ও সাইজ আগে থেকে বাছা অবস্থায়
    // কোটেশন ফর্ম খোলে, তাই ব্যবহারকারীকে আবার ড্রপডাউন ঘাঁটতে হয় না
    const askForQuote = (grade, mm) =>
        window.dispatchEvent(new CustomEvent('open-quote', {
            detail: { product: grade ? `Anwars ${grade}` : undefined, size: mm },
        }));

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
                        {APPLICATIONS.map(({ image, name, text }, i) => (
                            <article key={name} className="ps-reveal vmv-card">
                                <div className="vmv-media">
                                    <img src={image} alt={name} loading="lazy" />
                                </div>
                                <div className="vmv-scrim" />

                                <span className="vmv-num" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <span className="vmv-plus" aria-hidden="true">
                                    <Plus size={17} />
                                </span>

                                <div className="vmv-body">
                                    <h3 className="vmv-title">{name}</h3>
                                    <p className="vmv-text"><span>{text}</span></p>
                                </div>
                            </article>
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
                        <table className="ps-table">
                            <thead>
                                <tr>
                                    {GRADES.map((g) => (
                                        <th key={g} colSpan={2}>{g}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {SIZE_ROWS.map((row, r) => (
                                    <tr key={r}>
                                        {GRADES.map((g) =>
                                            row[g].map((mm, c) => (
                                                <td key={`${g}-${c}`}>
                                                    {mm === null ? (
                                                        <span className="ps-empty">—</span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="ps-size"
                                                            onClick={() => askForQuote(g, mm)}
                                                            title={`Request a quotation for ${g} ${mm}mm`}
                                                        >
                                                            {mm} mm
                                                        </button>
                                                    )}
                                                </td>
                                            ))
                                        )}
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
                        onClick={() => askForQuote()}
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
