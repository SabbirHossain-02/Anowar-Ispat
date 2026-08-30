import React, { useRef } from 'react';
import {
    Recycle, Users, Factory, GraduationCap, Sun, Trees, HeartPulse,
} from 'lucide-react';
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

// পাতার শিরোনামেই ESG আছে, তাই প্রতিটি স্তম্ভের পেছনে তার আদ্যক্ষরটাই
// বড় করে বসে — বাইরে থেকে আনা কোনো প্রতীক নয়।
const PILLARS = [
    {
        letter: 'E',
        title: 'Environmental',
        sub: 'Planet and ecology',
        items: [
            'Renewable energy',
            'Waste reduction and recycling',
            'Environmental consciousness',
            'Green manufacturing',
        ],
    },
    {
        letter: 'S',
        title: 'Social',
        sub: 'People and community',
        items: [
            'Community engagement',
            'Healthcare and sanitation',
            'Education',
            'Employee health and safety',
        ],
    },
    {
        letter: 'G',
        title: 'Governance',
        sub: 'Ethics and accountability',
        items: [
            'Ethics and compliance',
            'Risk management',
            'Transparency and disclosure',
            'Sustainability reporting',
        ],
    },
];

const SDGS = [
    { icon: Recycle, label: 'Recycling and waste reduction' },
    { icon: Users, label: 'Supporting local communities' },
    { icon: Factory, label: 'Green design and manufacturing' },
    { icon: GraduationCap, label: 'Education' },
    { icon: Sun, label: 'Renewable energy adoption' },
    { icon: Trees, label: 'Reforestation' },
    { icon: HeartPulse, label: 'Healthcare and sanitation' },
];

const PRACTICES = [
    {
        label: 'Energy saving',
        text: 'Energy-saving reheating induction systems across all production facilities.',
    },
    {
        label: 'Zero waste water',
        text: 'Zero-waste water recycling policies, keeping discharge out of the surrounding land.',
    },
    {
        label: 'Carbon reduction',
        text: 'Reducing the industrial carbon footprint through modern green manufacturing.',
    },
];

const COMMITMENT = [
    'At Anwar Group of Industries, we recognize that our operations have an impact on the environment, and we are committed to minimizing that impact through sustainable practices.',
    'We strongly believe that taking care of its employees and giving back to the society have played a vital part in establishing the company as one of the oldest, largest and most diversified industrial groups.',
    'At the heart of our activities is the deep rooted conviction towards people and society at large, that emanates from the values that have been in the family for many centuries.',
];

const STATS = [
    { n: '48+', l: 'Years responsible' },
    { n: 'ZERO', l: 'Waste water discharge' },
    { n: '07', l: 'SDG commitments' },
];

const SustainabilityESGPage = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.esg-reveal').forEach((el) => {
            gsap.from(el, {
                y: 32, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            });
        });

        gsap.utils.toArray('.esg-pillar').forEach((el, i) => {
            gsap.from(el, {
                y: 34, opacity: 0, duration: 0.7, ease: 'power3.out',
                delay: i * 0.1,
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });
    }, { scope: rootRef });

    const heading = (eyebrow, title) => (
        <div className="esg-reveal esg-head">
            <span className="esg-eyebrow">{eyebrow}</span>
            <h2 className="esg-title">{title}</h2>
        </div>
    );

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/sustainable-steel.jpg"
                label="SUSTAINABILITY"
                title="Sustainable Steel"
                accent="Development"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Sustainability' },
                    { label: 'Environmental, Social, Governance' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="esg-reveal esg-lede">
                    Championing the Sustainable Development Goals through how the mill is run —
                    sustainable business practice, community empowerment and environmental
                    stewardship.
                </p>

                <div className="esg-reveal esg-stats">
                    {STATS.map((s) => (
                        <div key={s.l} className="esg-stat">
                            <span className="esg-stat-n">{s.n}</span>
                            <span className="esg-stat-l">{s.l}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* CHAIRMAN */}
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
                    <figure className="esg-reveal esg-quote">
                        <div className="esg-portrait">
                            <img src="/Manwar-Hossain-transparent-1by1-ar.png" alt="Manwar Hossain" loading="lazy" />
                        </div>
                        <div className="esg-quote-body">
                            <blockquote>
                                I envision <em>Anwar Group</em> not just as a business entity but as a
                                catalyst for progress, for a <em>sustainable</em> and equitable future.
                            </blockquote>
                            <figcaption>
                                <span className="esg-quote-rule" aria-hidden="true" />
                                <span className="esg-quote-name">Manwar Hossain</span>
                                <span className="esg-quote-role">Chairman, Anwar Group</span>
                            </figcaption>
                        </div>
                    </figure>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* THREE PILLARS */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
            }}>
                {heading('THREE PILLARS', 'Our ESG framework')}

                <div className="esg-pillars">
                    {PILLARS.map((p) => (
                        <article key={p.letter} className="esg-pillar">
                            <span className="esg-pillar-letter" aria-hidden="true">{p.letter}</span>
                            <h3 className="esg-pillar-title">{p.title}</h3>
                            <p className="esg-pillar-sub">{p.sub}</p>
                            <ul className="esg-pillar-list">
                                {p.items.map((it) => <li key={it}>{it}</li>)}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* SDG COMMITMENTS */}
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
                    {heading('UNITED NATIONS', 'SDG commitments')}

                    {/* সাতটি — তালিকা হিসেবেই রাখা, কার্ড নয়। তালিকার শেষ
                        সারিতে একটি পড়লে সেটা অস্বাভাবিক দেখায় না */}
                    <ul className="esg-sdg esg-reveal">
                        {SDGS.map(({ icon: Icon, label }) => (
                            <li key={label}>
                                <span className="esg-sdg-icon"><Icon size={17} strokeWidth={1.75} /></span>
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* COMMITMENT */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
            }}>
                {heading('OUR COMMITMENT', 'Sustainable business practices')}

                <div className="esg-commit">
                    <div className="esg-reveal esg-commit-text">
                        {COMMITMENT.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
                    </div>

                    <div className="esg-reveal esg-practices">
                        {PRACTICES.map((p, i) => (
                            <article key={p.label} className="esg-practice">
                                <span className="esg-practice-n" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className="esg-practice-label">{p.label}</h3>
                                    <p className="esg-practice-text">{p.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SustainabilityESGPage;
