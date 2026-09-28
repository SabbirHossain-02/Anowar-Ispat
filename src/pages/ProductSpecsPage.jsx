import React, { useRef, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
import { useContent } from '../lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
const DEFAULTS = {
    banner: {
        image: '/Product-Specifications.jpeg',
        label: 'PRODUCT SPECIFICATIONS',
        title: 'Built for',
        accent: 'Strength',
    },
    crumb: 'Product Specifications',
    intro: 'Every batch is tested on a spectrometer across 28 elements before it leaves the mill, to hold the tolerances that piling, slabs and columns are designed against.',
    apps: {
        eyebrow: 'APPLICATIONS',
        title: 'Where the bar goes',
        items: [
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
],
    },
    chart: {
        eyebrow: 'SIZE CHART',
        title: 'Available diameters',
        note: '420DWR is not produced in 8 mm. For any diameter or quantity, send us the requirement and we will confirm availability.',
        quoteBtn: 'Request a quotation',
        // টেবিলের প্রতিটি গ্রেড একটি কলাম-জোড়া; সাইজগুলো বাঁ থেকে ডানে,
        // উপর থেকে নিচে দুটি করে বসে। '—' মানে ওই ঘরে সাইজ তৈরি হয় না
        // (যেমন 420DWR এ ৮ মি.মি.), সারি মিলিয়ে রাখতে ফাঁকা ঘর।
        // ক্লায়েন্টের অনুরোধে 500CWR আপাতত বাদ।
        columns: [
            { grade: '500DWR', sizes: ['8', '10', '12', '16', '20', '22', '25', '28', '32', '40'] },
            { grade: '420DWR', sizes: ['—', '10', '12', '16', '20', '22', '25', '28', '32', '40'] },
        ],
    },
};

// আগের সংস্করণে প্যানেলে শুধু গ্রেডের নাম থাকত (chart.grades), সাইজ কোডে।
// সেভাবে সংরক্ষিত থাকলে সেই নামগুলো দিয়েই কলাম গড়ি।
const OLD_SIZES = {
    '500CWR': ['8', '10', '12', '16', '20', '22', '25', '28', '32', '40'],
    '500DWR': ['8', '10', '12', '16', '20', '22', '25', '28', '32', '40'],
    '420DWR': ['—', '10', '12', '16', '20', '22', '25', '28', '32', '40'],
};

const isBlank = (v) => v === null || v === undefined || /^\s*(—|-|–)?\s*$/.test(String(v));

const ProductSpecsPage = () => {
    const rootRef = useRef(null);
    const c = useContent('products-specifications', DEFAULTS);

    // প্যানেলের কলামগুলো; নাম ছাড়া কলাম বাদ। সব মুছে ফেললে টেবিলটাই
    // যেন উধাও না হয়, তখন কোডের কলাম।
    const saved = Array.isArray(c.chart.columns) && c.chart.columns.length
        ? c.chart.columns
        : (Array.isArray(c.chart.grades) && c.chart.grades.length
            ? c.chart.grades.map((g) => ({ grade: String(g).trim().toUpperCase(), sizes: OLD_SIZES[String(g).trim().toUpperCase()] || [] }))
            : DEFAULTS.chart.columns);
    let COLUMNS = saved
        .map((col) => ({ grade: String(col.grade || '').trim(), sizes: Array.isArray(col.sizes) ? col.sizes : [] }))
        .filter((col) => col.grade);
    if (!COLUMNS.length) COLUMNS = DEFAULTS.chart.columns;
    // প্রতি সারিতে প্রতিটি গ্রেডের দুটি সাইজ
    const rowCount = Math.max(1, ...COLUMNS.map((col) => Math.ceil(col.sizes.length / 2)));
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
                image={c.banner.image}
                label={c.banner.label}
                title={c.banner.title}
                accent={c.banner.accent}
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: c.crumb },
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
                    {c.intro}
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
                    {heading(c.apps.eyebrow, c.apps.title)}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                    }}>
                        {(Array.isArray(c.apps.items) ? c.apps.items : []).map(({ image, name, text }, i) => (
                            <article key={i} className="ps-reveal vmv-card">
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
                    {heading(c.chart.eyebrow, c.chart.title)}

                    {/* চওড়া টেবিল যেন পুরো পেজ পাশে ঠেলে না দেয়, তাই নিজের
                        ভেতরেই স্ক্রল করে */}
                    <div className="ps-reveal" style={{ overflowX: 'auto' }}>
                        <table className="ps-table">
                            <thead>
                                <tr>
                                    {COLUMNS.map((col, ci) => (
                                        <th key={ci} colSpan={2}>{col.grade}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: rowCount }, (_, r) => (
                                    <tr key={r}>
                                        {COLUMNS.map((col, ci) =>
                                            [col.sizes[r * 2], col.sizes[r * 2 + 1]].map((raw, k) => {
                                                const v = isBlank(raw) ? null : String(raw).trim();
                                                // শুধু সংখ্যা হলে পাশে mm বসে; নিজে লিখে দিলে যেমন আছে
                                                const mm = v && /^\d+(\.\d+)?$/.test(v) ? Number(v) : v;
                                                const label = typeof mm === 'number' ? `${mm} mm` : mm;
                                                return (
                                                <td key={`${ci}-${k}`}>
                                                    {v === null ? (
                                                        <span className="ps-empty">—</span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="ps-size"
                                                            onClick={() => askForQuote(col.grade, mm)}
                                                            title={`Request a quotation for ${col.grade} ${label}`}
                                                        >
                                                            {label}
                                                        </button>
                                                    )}
                                                </td>
                                                );
                                            })
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
                        {c.chart.note}
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
                        {c.chart.quoteBtn}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductSpecsPage;
