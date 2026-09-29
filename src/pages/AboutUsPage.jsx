import React, { useRef, useState, useEffect } from 'react';
import { History, Cpu, Rocket, ShieldCheck, Microscope, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
import { useContent } from '../lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// স্লাইডে যে শব্দগুলো মোটা করা ছিল সেগুলোই <b> — পড়ার সময় চোখ
// ওখানেই আটকায়, তাই দাবিগুলো দ্রুত বোঝা যায়
const B = ({ children }) => (
    <b style={{ color: 'var(--text)', fontWeight: 700 }}>{children}</b>
);

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
const DEFAULTS = {
    banner: {
        image: '/about-banner.jpeg',
        label: 'ABOUT US',
        title: 'Forged in Fire, Built for',
        accent: 'Eternity',
    },
    crumb: 'About us',
    intro: "As a proud concern of the century-old Anwar Group, Anwar Ispat has led the mild steel industry since 1978. We were the first to introduce 60-grade steel to Bangladesh and have consistently upgraded our facilities to bring the world's most advanced technology to the local market. From the tallest skyscrapers to complex nuclear power plants, our commitment to quality ensures that every structure built with Anwar Ispat is resilient, durable, and safe.",
    timeline: {
        title: 'A Legacy Value',
        // {count}, {first}, {last} — তালিকা থেকে নিজেই বসে
        note: '',
        // আনোয়ার ইস্পাতের নিজের পথচলা, ক্লায়েন্টের স্লাইড অনুযায়ী।
        // গ্রুপের পুরো ইতিহাস Heritage পাতার নিজস্ব তালিকায়
        items: [
            { year: '1978', name: 'Founded Khaled Iron', text: '' },
            { year: '1985', name: 'Anwar Group Introduced 60-Grade Bar in Bangladesh', text: '' },
            { year: '2004', name: "Rebranded Khaled Iron to 'Anwar Ispat'", text: '' },
            { year: '2009', name: 'Anwar Ispat Introduced 500W TMT Box in Bangladesh', text: '' },
            { year: '2018', name: 'Enhanced Production Capacity for Anwar Ispat', text: '' },
            { year: '2020', name: 'Launched 500 DWR & 420 DWR Bars', text: '' },
        ],
    },
    why: {
        eyebrow: 'WHY ANWAR ISPAT',
        title: 'Six reasons builders choose us',
        items: [
            { title: '190+ Years of Legacy', body: 'Part of the prestigious Anwar Group, building trust in Bangladesh since 1834.' },
            { title: 'European Technology', body: 'The only manufacturer in Bangladesh using patented TMT technology from Belgium for superior reinforcement.' },
            { title: 'Pioneer in Innovation', body: 'The trailblazer in the Bangladesh steel industry, being the first to introduce 60-Grade reinforcement bars to the country.' },
            { title: 'Earthquake Resistant', body: 'Engineered with a high TS/YS ratio for maximum ductility, meeting strict BNBC and ACI safety codes.' },
            { title: 'Precision Quality', body: 'Every batch is tested via Spectrometer (28-element analysis) to ensure 100% compliance with BSTI and ISO standards.' },
            { title: 'Nation Builder', body: "A proven partner for Bangladesh's iconic mega-projects and thousands of individual homes." },
        ],
    },
};

// আইকন JSON এ রাখা যায় না, তাই কোডেই থাকে ও ক্রম অনুযায়ী বসে
const WHY_ICONS = [History, Cpu, Rocket, ShieldCheck, Microscope, Building2];

// পুরো পেজে একটাই স্পেসিং স্কেল
const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

const AboutUsPage = () => {
    const rootRef = useRef(null);
    const c = useContent('about', DEFAULTS);
    const timelineRef = useRef(null);

    // সোজা রেখার বদলে sine ঢেউ। উপরের কার্ডের নিচে ঢেউ ওঠে, নিচের
    // কার্ডের উপরে নামে — এক ঢেউ = দুটি ঘটনা। বিন্দুগুলো ঢেউয়ের
    // ঠিক উপরে বসে, তাই প্রতিটি আইটেমে --wave দিয়ে সেই উচ্চতা দেওয়া।
    const WAVE_AMP = 32;
    const [wave, setWave] = useState({ d: '', w: 0, h: 0 });
    const pathRef = useRef(null);
    // ঢেউটা স্ক্রলের সাথে আঁকা হয় — যত নম্বর সাল পর্যন্ত ফুটেছে, লাইন
    // ততটুকুই। তাই প্রতিটি সালের বিন্দু পর্যন্ত রেখার দৈর্ঘ্য মনে রাখি,
    // আর শেষ কতটা আঁকা হয়েছিল সেটাও — মাপ বদলে আবার আঁকলে ফিরিয়ে দিতে
    const waveMeta = useRef({ total: 0, lenAt: [], due: 0 });

    // due নম্বর সাল পর্যন্ত রেখা টানা
    const drawTo = (due) => {
        const path = pathRef.current;
        const { total, lenAt } = waveMeta.current;
        if (!path || !total) return;
        waveMeta.current.due = due;
        const upto = due > 0 ? (lenAt[due - 1] ?? total) : 0;
        path.style.strokeDashoffset = String(total - upto);
    };

    useEffect(() => {
        const el = timelineRef.current;
        if (!el) return;
        const track = el.querySelector('.tl-track');
        if (!track) return;

        const draw = () => {
            const items = Array.from(track.querySelectorAll('.tl-item'));
            // scrollWidth নয় — তাতে আগের আঁকা ঢেউটাও ধরা পড়ে, জানালা ছোট
            // করলে পুরনো চওড়া ঢেউ ট্র্যাককে চওড়া রেখে দিত, আর কমত না
            const W = track.offsetWidth;
            const H = track.offsetHeight;
            if (!items.length || !W || !H) return;

            const mid = H / 2;
            const x0 = items[0].offsetLeft + items[0].offsetWidth / 2;
            // পাশাপাশি দুটি আইটেমের মাঝের দূরত্ব = অর্ধেক ঢেউ
            const L = items.length > 1
                ? (items[1].offsetLeft + items[1].offsetWidth / 2) - x0
                : items[0].offsetWidth;

            // প্রথম আইটেম (উপরের কার্ড) ঢেউয়ের চূড়ায় → -A
            const y = (x) => mid - WAVE_AMP * Math.cos((Math.PI * (x - x0)) / L);

            // path আঁকতে আঁকতে দৈর্ঘ্যও জমাই, আর প্রতিটি সালের মাঝবরাবর
            // পৌঁছালে সেই মুহূর্তের দৈর্ঘ্য টুকে রাখি
            const centres = items.map((it) => it.offsetLeft + it.offsetWidth / 2);
            const lenAt = [];
            let d = '', len = 0, px = 0, py = y(0), ci = 0;
            for (let x = 0; x <= W; x += 6) {
                const yy = y(x);
                if (x) len += Math.hypot(x - px, yy - py);
                d += (x ? ' L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(2);
                while (ci < centres.length && x >= centres[ci]) { lenAt.push(len); ci += 1; }
                px = x; py = yy;
            }
            len += Math.hypot(W - px, y(W) - py);
            d += ' L' + W + ' ' + y(W).toFixed(2);
            while (ci < centres.length) { lenAt.push(len); ci += 1; }

            waveMeta.current.total = len;
            waveMeta.current.lenAt = lenAt;
            setWave({ d, w: W, h: H, total: len });
        };

        draw();
        const ro = new ResizeObserver(draw);
        ro.observe(track);
        return () => ro.disconnect();
    }, [c.timeline.items.length]);
    const [isMobile, setIsMobile] = useState(false);

    // ঘটনাগুলো ফোটে পাতা নিচে গড়ানোর সাথে — মাউস যেখানেই থাকুক।
    // টাইমলাইনের মাথা পর্দার ৭৫% এ পৌঁছালে প্রথমটি, তলা ৫৫% এ
    // পৌঁছানোর আগেই শেষটি; মাঝের পথ সমান ভাগে, তাই একেক ধাপে একেকটি।
    // একবার ফুটলে আর নিভে যায় না, উপরে ফিরে গেলেও।
    // প্যানেল থেকে সাল যোগ বা বদল হলে পাতা রিফ্রেশ হয় না — তখন নতুন
    // ঘটনাগুলোকেও একই নিয়মে ফোটাতে হয়, তাই apply বাইরে থেকে ডাকা যায়
    const revealRef = useRef(null);

    useEffect(() => {
        const el = timelineRef.current;
        if (!el) return;

        let shown = 0;
        const apply = (progress) => {
            // প্রতিবার নতুন করে খুঁজি — লেখা বদলালে React পুরনো ঘটনার
            // জায়গায় নতুন ঘটনা বসায়, আগের তালিকা তখন আর পাতায় নেই
            const items = Array.from(el.querySelectorAll('.tl-item'));
            if (items.length === 0) return;
            const due = Math.min(
                items.length,
                Math.max(shown, Math.floor(progress * items.length) + 1),
            );
            shown = due;

            drawTo(due);

            let newly = 0;
            for (let i = 0; i < due; i += 1) {
                const item = items[i];
                if (item.classList.contains('is-in')) continue;
                // দ্রুত গড়ালে একসাথে কয়েকটি পাওনা হয়ে যায় — তখনও
                // যেন একসাথে না ফুটে, একটু পরপর ফোটে
                item.style.setProperty('--tl-delay', `${newly * 0.08}s`);
                item.classList.add('is-in');
                newly += 1;
            }
        };

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 75%',
            end: 'bottom 55%',
            onUpdate: (self) => apply(self.progress),
            // লাফ দিয়ে নিচে গেলে (লিংক বা রিফ্রেশে) বাকিগুলোও ফোটে
            onEnter: (self) => apply(self.progress),
            onLeave: () => apply(1),
        });
        // পাতা খোলার সময়েই টাইমলাইন পার হয়ে থাকলে
        if (st.progress > 0) apply(st.progress);

        revealRef.current = () => { if (st.progress > 0 || st.isActive) apply(st.progress); };
        return () => {
            revealRef.current = null;
            st.kill();
        };
    }, []);

    // লেখা এলে (প্রথমবার বা প্যানেলে সংরক্ষণের পর) যা ফোটার কথা তা ফোটাই
    useEffect(() => {
        if (revealRef.current) revealRef.current();
    }, [c.timeline.items]);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.ab-reveal').forEach((el) => {
            gsap.from(el, {
                y: 48, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
            });
        });
        // useGSAP scope এর ভেতরের সব animation ও ScrollTrigger
        // কম্পোনেন্ট unmount হলে নিজেই পরিষ্কার করে দেয়
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
                    { label: c.crumb },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* BACKGROUND */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                ...CONTAINER,
                paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="ab-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)', textAlign: 'center',
                    margin: '0 auto', maxWidth: '860px',
                }}>
                    {c.intro}
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* HERITAGE TIMELINE */}
            {/* ---------------------------------------------------------- */}
            {/* একটানা অনুভূমিক রেখা, দুপাশে পালা করে ঘটনা — ডালে পাতার
                মতো। ২৯টি মাইলফলক পাশে গড়িয়ে দেখা যায়। */}
            {/* নিচের সারির কার্ডগুলো পর্দার কিনারায় গিয়ে ঠেকছিল, তাই
                নিচের ফাঁক বেশি */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.8)`,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    <div className="ab-reveal tl-head">
                        <h2 className="tl-title">
                            {c.timeline.title}
                        </h2>
                        {c.timeline.note && (
                            <p className="tl-note">
                                {String(c.timeline.note)
                                    .replace(/\{count\}/g, c.timeline.items.length)
                                    .replace(/\{first\}/g, c.timeline.items[0]?.year ?? '')
                                    .replace(/\{last\}/g, c.timeline.items[c.timeline.items.length - 1]?.year ?? '')}
                            </p>
                        )}
                    </div>
                </div>

                {/* পুরো চওড়া জুড়ে — কনটেইনারে আটকালে রেখাটা ছোট দেখাত */}
                <div className="tl-scroll" ref={timelineRef}>
                    <ol className="tl-track tl-fit">
                        {wave.d && (
                            <svg
                                className="tl-line"
                                aria-hidden="true"
                                width={wave.w}
                                height={wave.h}
                                viewBox={`0 0 ${wave.w} ${wave.h}`}
                            >
                                <defs>
                                    {/* দুই কিনারায় মিলিয়ে যায় — আগের গ্রেডিয়েন্টের মতোই */}
                                    <linearGradient id="tl-fade" x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="0" stopColor="var(--glass-border)" stopOpacity="0" />
                                        <stop offset="0.04" stopColor="var(--glass-border)" stopOpacity="1" />
                                        <stop offset="0.96" stopColor="var(--glass-border)" stopOpacity="1" />
                                        <stop offset="1" stopColor="var(--glass-border)" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    ref={(el) => {
                                        pathRef.current = el;
                                        // নতুন করে আঁকা হলে যতটা ছিল ততটাই থাক
                                        if (el) requestAnimationFrame(() => drawTo(waveMeta.current.due));
                                    }}
                                    d={wave.d}
                                    fill="none"
                                    stroke="url(#tl-fade)"
                                    strokeWidth="3"
                                    strokeDasharray={wave.total || 1}
                                    strokeDashoffset={wave.total || 1}
                                />
                            </svg>
                        )}

                        {c.timeline.items.map((m, i) => (
                            <li
                                key={`${m.year}-${m.name}`}
                                className={[
                                    'tl-item',
                                    i % 2 === 0 ? 'is-above' : 'is-below',
                                    m.highlight ? 'is-key' : '',
                                    m.memoriam ? 'is-memoriam' : '',
                                ].filter(Boolean).join(' ')}
                                style={{ '--wave': `${i % 2 === 0 ? -WAVE_AMP : WAVE_AMP}px` }}
                            >
                                <div className="tl-card">
                                    <span className="tl-year">{m.year}</span>
                                    <h3 className="tl-name">{m.name}</h3>
                                    {m.text && <p className="tl-text">{m.text}</p>}
                                </div>
                                <span className="tl-stem" aria-hidden="true" />
                                <span className="tl-dot" aria-hidden="true" />
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* WHY ANWAR ISPAT */}
            {/* ---------------------------------------------------------- */}
            {/* টাইমলাইনের পর এটিই শেষ সেকশন, তাই ফুটারের আগে
                বাকি পেজগুলোর মতোই বেশি ফাঁক */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)',
            }}>
                <div style={CONTAINER}>
                    <div className="ab-reveal" style={{ marginBottom: SECTION_PAD }}>
                        <span style={{
                            fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.28em', color: 'var(--accent)',
                        }}>
                            {c.why.eyebrow}
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                            fontWeight: 800, margin: '0.8rem 0 0', letterSpacing: '0.02em',
                        }}>
                            {c.why.title}
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        columnGap: 'clamp(2rem, 5vw, 4.5rem)',
                    }}>
                        {c.why.items.map(({ title, body }, i) => {
                            const Icon = WHY_ICONS[i % WHY_ICONS.length];
                            return (
                            <div key={title} className="ab-reveal why-item">
                                <span className="why-num" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <div>
                                    <div className="why-head">
                                        <Icon className="why-icon" size={19} />
                                        <h3 className="why-title">{title}</h3>
                                    </div>
                                    <p className="why-text">{body}</p>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUsPage;
