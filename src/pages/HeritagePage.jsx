import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
import { MILESTONES } from '../lib/heritage';
import { useContent } from '../lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
const DEFAULTS = {
    banner: {
        image: '/heritage-banner.jpeg',
        label: 'HERITAGE',
        title: 'Nearly two centuries of',
        accent: 'Building',
    },
    lede: 'A legacy to value and enjoy in the present, and to preserve and pass on to future generations.',
    eras: [
        { span: '1834 — 1946', title: 'The founding trades', note: 'Four generations before steel, the family traded cloth, hide and household goods.', from: '1834', to: '1946' },
        { span: '1965 — 1983', title: 'Into manufacturing', note: 'The move from trading to making things, and the first steel mill.', from: '1965', to: '1983' },
        { span: '1995 — 2001', title: 'Diversification', note: 'Galvanising, jute, textiles, cement, real estate and agriculture within seven years.', from: '1995', to: '2001' },
        { span: '2004 — 2022', title: 'The modern group', note: 'Anwar Ispat is founded, and the group extends into polymers, automotive and technology.', from: '2004', to: '2022' },
    ],
};

// মাইলফলকের তালিকা About Us পাতার সাথে ভাগ করা — দুই জায়গায় দুটি
// কপি রাখলে একটিতে সাল বদলে অন্যটি পুরোনো থেকে যেত
const ABOUT_FALLBACK = { timeline: { items: MILESTONES } };

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
    const c = useContent('about-heritage', DEFAULTS);
    // একই অনুরোধ থেকেই আসে, তাই দ্বিতীয়বার নেটওয়ার্কে যায় না
    const about = useContent('about', ABOUT_FALLBACK);

    // যুগের সীমা ধরে মাইলফলকগুলো ভাগ করা
    const milestones = about.timeline?.items || [];
    const eras = (c.eras || []).map((era) => ({
        ...era,
        events: milestones.filter((m) => {
            const y = parseInt(m.year, 10);
            return y >= parseInt(era.from, 10) && y <= parseInt(era.to, 10);
        }),
    }));
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

    // এবাউট পাতার টাইমলাইনের মতোই — বিন্দুগুলো ঢেউয়ের উপর বসে, ঢেউ
    // স্ক্রলের সাথে বাঁ থেকে ডানে আঁকা হয়, তারপর বিন্দু → রেখা → লেখা
    // ধাপে ধাপে ফোটে। সেখানে এক ঢেউ = দুটি ঘটনা; এখানে গ্রিডের এক
    // সারিতে যতগুলো ঘটনা, তাদের উপর দিয়েই এক ঢেউ যায়।
    const HR_AMP = 14;
    const [waves, setWaves] = useState([]);

    useEffect(() => {
        const grids = Array.from(document.querySelectorAll('.hr-grid'));
        if (!grids.length) return;

        let sig = '';

        const layout = () => {
            const next = [];

            grids.forEach((grid, gi) => {
                const rows = Array.from(grid.querySelectorAll('.hr-row'));
                if (!rows.length) return;

                // একই offsetTop মানে একই সারি
                const byTop = new Map();
                rows.forEach((el) => {
                    const top = Math.round(el.offsetTop);
                    if (!byTop.has(top)) byTop.set(top, []);
                    byTop.get(top).push(el);
                });

                let r = 0;
                byTop.forEach((group) => {
                    group.sort((a, b) => a.offsetLeft - b.offsetLeft);
                    const key = gi + '-' + r;

                    group.forEach((el, i) => {
                        el.style.setProperty('--hr-delay', `${i * 0.08}s`);
                        // জোড় ঘর চূড়ায়, বিজোড় খাদে
                        el.style.setProperty('--hr-wave', `${i % 2 === 0 ? -HR_AMP : HR_AMP}px`);
                        el.dataset.wave = key;
                    });

                    // একটিমাত্র ঘটনা থাকলে ঢেউ আঁকার কিছু নেই
                    if (group.length > 1) {
                        // বিন্দুগুলোর অনুভূমিক অবস্থান — .hr-entry এর বাঁ কিনারা
                        const xs = group.map((el) => {
                            const entry = el.querySelector('.hr-entry');
                            return (entry ? entry.offsetLeft + el.offsetLeft : el.offsetLeft);
                        });
                        const x0 = xs[0];
                        const L = xs[1] - xs[0];
                        const W = xs[xs.length - 1] - x0;
                        const mid = HR_AMP;
                        const y = (x) => mid - HR_AMP * Math.cos((Math.PI * x) / L);

                        let d = '', len = 0, px = 0, py = y(0);
                        for (let x = 0; x <= W; x += 4) {
                            const yy = y(x);
                            if (x) len += Math.hypot(x - px, yy - py);
                            d += (x ? ' L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(2);
                            px = x; py = yy;
                        }

                        next.push({
                            key,
                            left: x0,
                            // বিন্দুর মাঝবরাবর: .hr-entry::before এর top 0.5rem = 8px, ব্যাসার্ধ 6px
                            top: Math.round(group[0].offsetTop) + 14 - HR_AMP,
                            w: W,
                            h: HR_AMP * 2,
                            d,
                            len,
                        });
                    }
                    r += 1;
                });
            });

            // একই ফল হলে আবার রেন্ডার করিয়ে লাভ নেই
            const s = next.map((w) => w.key + w.left + w.top + w.w).join('|');
            if (s !== sig) { sig = s; setWaves(next); }
        };

        layout();

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                // এই সারির ঢেউটিও আঁকা শুরু হোক
                const key = entry.target.dataset.wave;
                if (key) {
                    const path = document.querySelector(`.hr-wave[data-wave="${key}"] path`);
                    if (path) path.style.strokeDashoffset = '0';
                }
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -12% 0px' });

        grids.forEach((g) => g.querySelectorAll('.hr-row').forEach((el) => io.observe(el)));

        // কলামের সংখ্যা বদলালে সারি বদলায় — ঢেউ নতুন করে
        const ro = new ResizeObserver(layout);
        grids.forEach((g) => ro.observe(g));

        return () => { io.disconnect(); ro.disconnect(); };
    }, [eras.length]);

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
                    {c.lede}
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
                    {eras.map((era, eraIndex) => (
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

                            {/* আগে প্রতিটি ঘটনা পুরো প্রস্থ নিয়ে একটা সারি ছিল —
                                ২৯টি ঘটনা মানে ২৯ বার নিচে নামা। এখন পাশাপাশি
                                বসে, বাঁ থেকে ডানে পড়ে পরের সারিতে যায়। গ্রিড
                                নিজেই সারি-ক্রমে সাজায়, তাই সালের ধারাবাহিকতা
                                অটুট থাকে। */}
                            <div className="hr-grid">
                                {waves
                                    .filter((w) => w.key.startsWith(`${eraIndex}-`))
                                    .map((w) => (
                                        <svg
                                            key={w.key}
                                            className="hr-wave"
                                            data-wave={w.key}
                                            aria-hidden="true"
                                            width={w.w}
                                            height={w.h}
                                            viewBox={`0 0 ${w.w} ${w.h}`}
                                            style={{ left: w.left, top: w.top }}
                                        >
                                            <path
                                                d={w.d}
                                                fill="none"
                                                stroke="var(--glass-border)"
                                                strokeWidth="2"
                                                strokeDasharray={w.len}
                                                strokeDashoffset={w.len}
                                            />
                                        </svg>
                                    ))}

                                {era.events.map((e) => (
                                    <div
                                        key={`${e.year}-${e.name}`}
                                        className="hr-row"
                                    >
                                        <div className="hr-entry">
                                            <span className="hr-year">{e.year}</span>
                                            <h3 className={`hr-name${e.highlight ? ' hr-name-accent' : ''}`}>
                                                {e.name}
                                            </h3>
                                            <p className="hr-text">{e.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HeritagePage;
