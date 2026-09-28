import React, { useRef, useState, useEffect, useCallback } from 'react';
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

// ঢেউয়ের উচ্চতা — এবাউট পাতার টাইমলাইনের সমান
const AMP = 32;
// ঢেউটি প্রতি কত px এ একবার মাপা হয়
const STEP = 4;

/* ----------------------------------------------------------------------
   একটি যুগ = একটি পিন করা সেকশন, একটিই সারি।

   পাতা নিচে গড়ালে সেকশনটি পর্দায় আটকে থাকে, আর সেই উল্লম্ব স্ক্রলই
   টাইমলাইনকে বাঁ থেকে ডানে টেনে নেয়। একটি "সামনের রেখা" (front)
   প্রথম ঘটনা থেকে শেষ ঘটনা পর্যন্ত এগোয়:
     • ঢেউ ঠিক ততদূর আঁকা — বিন্দুতে বিন্দুতে নয়, একটানা
     • যে ঘটনার কেন্দ্র সেই রেখা পেরিয়েছে, সেটি ফোটে
     • ট্র্যাক এমনভাবে সরে যে সামনের রেখা পর্দার মাঝামাঝি থাকে
   উল্টো দিকে গড়ালে সবই উল্টো চলে।
   ---------------------------------------------------------------------- */
const EraTimeline = ({ era, index }) => {
    const sectionRef = useRef(null);
    const viewRef = useRef(null);
    const trackRef = useRef(null);
    const pathRef = useRef(null);
    const stRef = useRef(null);

    // মাপজোখ — রেন্ডার ঘটায় না, তাই ref এ
    const geo = useRef({ lens: [], centres: [], x0: 0, x1: 0, total: 0, trackW: 0 });
    const [wave, setWave] = useState({ d: '', w: 0, h: 0, total: 0 });

    // প্রগতি (0 → 1) থেকে সবকিছু
    const update = useCallback((p) => {
        const g = geo.current;
        const track = trackRef.current;
        const view = viewRef.current;
        if (!track || !view || !g.centres.length) return;

        const front = g.x0 + p * (g.x1 - g.x0);

        // ক্যামেরা: সামনের রেখা পর্দার ৫৫% এ থাকুক, দুই প্রান্তে থেমে যাক
        const vw = view.clientWidth;
        const maxShift = Math.max(0, g.trackW - vw);
        const shift = Math.min(maxShift, Math.max(0, front - vw * 0.55));
        track.style.transform = `translate3d(${-shift}px, 0, 0)`;

        // ঢেউ সামনের রেখা পর্যন্ত
        const path = pathRef.current;
        if (path && g.total) {
            const i = Math.max(0, Math.min(g.lens.length - 1, Math.round(front / STEP)));
            path.style.strokeDashoffset = String(g.total - g.lens[i]);
        }

        // কেন্দ্র পেরোলে ফোটে, পিছিয়ে গেলে আবার লুকায়
        const items = track.querySelectorAll('.tl-item');
        items.forEach((el, k) => {
            el.classList.toggle('is-in', g.centres[k] <= front + 0.5);
        });
    }, []);

    // ঢেউ ও কেন্দ্রগুলো মাপা
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return undefined;

        let raf = 0;
        const measure = () => {
            raf = 0;
            const items = Array.from(track.querySelectorAll('.tl-item'));
            if (!items.length) return;

            // ঘটনা কম হলে (যেমন প্রথম যুগে তিনটি) সারিটি পর্দার এক-তৃতীয়াংশে
            // থেমে যেত, ঢেউও সেখানেই শেষ হত। তখন প্রতিটি ঘটনার জায়গা
            // চওড়া করে সারিটিকে পুরো প্রস্থে ছড়িয়ে দিই। বেশি ঘটনার যুগে
            // স্বাভাবিক প্রস্থই থাকে, কারণ সেখানে সারি এমনিতেই পর্দা ছাড়ায়।
            const view = viewRef.current;
            if (view) {
                const cs = getComputedStyle(track);
                const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
                const vw = window.innerWidth;
                const base = vw <= 700 ? 175 : Math.min(250, Math.max(200, vw * 0.2));
                const fill = (view.clientWidth - pad) / items.length;
                const want = fill > base ? `${Math.floor(fill)}px` : '';
                if (track.style.getPropertyValue('--hr-item-w') !== want) {
                    if (want) track.style.setProperty('--hr-item-w', want);
                    else track.style.removeProperty('--hr-item-w');
                }
            }

            const W = track.scrollWidth;
            const H = track.offsetHeight;
            const centres = items.map((el) => el.offsetLeft + el.offsetWidth / 2);
            const c0 = centres[0];
            const L = centres.length > 1 ? centres[1] - c0 : items[0].offsetWidth;
            const mid = H / 2;
            // প্রথম ঘটনা (লেখা উপরে) চূড়ায়, পরেরটি খাদে
            const y = (x) => mid - AMP * Math.cos((Math.PI * (x - c0)) / L);

            // প্রতি STEP px এ বিন্দু; সাথে সেই পর্যন্ত মোট দৈর্ঘ্য
            const lens = [];
            let d = '';
            let len = 0;
            let px = 0;
            let py = y(0);
            for (let x = 0; x <= W; x += STEP) {
                const yy = y(x);
                if (x) len += Math.hypot(x - px, yy - py);
                d += (x ? ' L' : 'M') + x + ' ' + yy.toFixed(2);
                lens.push(len);
                px = x; py = yy;
            }

            geo.current = {
                lens,
                centres,
                x0: c0,
                x1: centres[centres.length - 1],
                total: len,
                trackW: W,
            };
            setWave({ d, w: W, h: H, total: len });

            // পিনের দৈর্ঘ্য মাপের উপর নির্ভর করে
            ScrollTrigger.refresh();
        };

        const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
        schedule();

        const ro = new ResizeObserver(schedule);
        ro.observe(track);
        if (viewRef.current) ro.observe(viewRef.current);

        return () => {
            ro.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [era.events.length]);

    // নতুন ঢেউ আঁকা হলে বর্তমান প্রগতিতেই বসাই
    useEffect(() => {
        update(stRef.current ? stRef.current.progress : 0);
    }, [wave.total, update]);

    // পিন ও স্ক্রল
    useGSAP(() => {
        if (!sectionRef.current) return;
        stRef.current = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            // যত পথ ঢেউকে যেতে হবে, স্ক্রলও মোটামুটি ততটা — কম ঘটনার
            // যুগেও অন্তত খানিকটা পথ থাকে, নইলে এক ঝলকে শেষ হত
            end: () => {
                const g = geo.current;
                const span = Math.max(0, g.x1 - g.x0);
                return '+=' + Math.max(window.innerHeight * 0.8, span * 1.15);
            },
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => update(self.progress),
            onRefresh: (self) => update(self.progress),
        });
        return () => {
            if (stRef.current) stRef.current.kill();
            stRef.current = null;
        };
    }, { scope: sectionRef, dependencies: [era.events.length] });

    return (
        <section ref={sectionRef} className="hr-era" aria-labelledby={`hr-era-${index}`}>
            <div style={CONTAINER} className="hr-era-head">
                <span className="hr-era-span">{era.span}</span>
                <h2 id={`hr-era-${index}`} className="hr-era-title">{era.title}</h2>
                <p className="hr-era-note">{era.note}</p>
            </div>

            <div className="hr-era-view" ref={viewRef}>
                <ol className="tl-track hr-track" ref={trackRef}>
                    {wave.d && (
                        <svg
                            className="tl-line hr-line"
                            aria-hidden="true"
                            width={wave.w}
                            height={wave.h}
                            viewBox={`0 0 ${wave.w} ${wave.h}`}
                        >
                            <defs>
                                <linearGradient id={`hr-fade-${index}`} x1="0" x2="1" y1="0" y2="0">
                                    <stop offset="0" stopColor="var(--glass-border)" stopOpacity="0" />
                                    <stop offset="0.04" stopColor="var(--glass-border)" stopOpacity="1" />
                                    <stop offset="0.96" stopColor="var(--glass-border)" stopOpacity="1" />
                                    <stop offset="1" stopColor="var(--glass-border)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                ref={pathRef}
                                d={wave.d}
                                fill="none"
                                stroke={`url(#hr-fade-${index})`}
                                strokeWidth="3"
                                strokeDasharray={wave.total || 1}
                                strokeDashoffset={wave.total || 1}
                            />
                        </svg>
                    )}

                    {era.events.map((m, i) => (
                        <li
                            key={`${m.year}-${m.name}`}
                            className={[
                                'tl-item',
                                i % 2 === 0 ? 'is-above' : 'is-below',
                                m.highlight ? 'is-key' : '',
                                m.memoriam ? 'is-memoriam' : '',
                            ].filter(Boolean).join(' ')}
                            style={{ '--wave': `${i % 2 === 0 ? -AMP : AMP}px` }}
                        >
                            <div className="tl-card">
                                <span className="tl-year">{m.year}</span>
                                <h3 className="tl-name">{m.name}</h3>
                                <p className="tl-text">{m.text}</p>
                            </div>
                            <span className="tl-stem" aria-hidden="true" />
                            <span className="tl-dot" aria-hidden="true" />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

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
    })).filter((era) => era.events.length > 0);

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
            {/* TIMELINE — প্রতিটি যুগ একটি পিন করা সেকশন, একটিই ঢেউ */}
            {/* ---------------------------------------------------------- */}
            {eras.map((era, i) => (
                <EraTimeline key={era.span} era={era} index={i} />
            ))}
        </div>
    );
};

export default HeritagePage;
