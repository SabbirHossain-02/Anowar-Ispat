import React, { useRef } from 'react';
import {
    GraduationCap, HeartPulse, Users, ShieldCheck, Trees, HandHeart,
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

// ছয়টি — তিন কলামে ঠিক দুই সারি, কোথাও একলা কার্ড পড়ে না
const INITIATIVES = [
    {
        icon: GraduationCap,
        title: 'Education',
        text: 'Funding schools and distributing scholarships so quality education reaches low-income families across Bangladesh.',
    },
    {
        icon: HeartPulse,
        title: 'Healthcare',
        text: 'Free medical camps and healthcare programmes bringing treatment to communities that are otherwise underserved.',
    },
    {
        icon: Users,
        title: 'Community',
        text: 'A deep-rooted conviction towards people and society, carried out through consistent local engagement.',
    },
    {
        icon: ShieldCheck,
        title: 'Employee welfare',
        text: 'Training, safety programmes and wellbeing initiatives for the people who run the mill.',
    },
    {
        icon: Trees,
        title: 'Environment',
        text: 'Reforestation drives and awareness campaigns to preserve the natural heritage of Bangladesh.',
    },
    {
        icon: HandHeart,
        title: 'Social welfare',
        text: 'Relief programmes, disaster response and social protection for vulnerable groups.',
    },
];

// আগে একই সংখ্যাগুলো পাতার দুই জায়গায় দুই নামে ছিল — একবারেই রাখা
const STATS = [
    { n: '10K+', l: 'Families supported' },
    { n: '500+', l: 'Scholarships awarded' },
    { n: '20+', l: 'Free medical camps' },
    { n: '5,000+', l: 'Trees planted' },
];

const PRINCIPLES = [
    {
        label: 'OUR MISSION',
        title: 'People first, always',
        text: 'We believe in building stronger communities through consistent investment in education, healthcare and social welfare programmes that create lasting impact.',
    },
    {
        label: 'OUR VISION',
        title: 'A stronger Bangladesh',
        text: 'From Chawk Bazar to the nation — building a socially responsible future by empowering the underprivileged and nurturing the next generation.',
    },
];

const COMMITMENT = [
    'Anwar Group and Anwar Ispat stand close to communities. We fund schools, distribute scholarships, and run medical camps to ensure quality healthcare and education for low-income families.',
    'At the heart of our activities is the deep-rooted conviction towards people and society at large, emanating from the values that have been in the family for many centuries.',
];

const SustainabilityCSRPage = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.csr-reveal').forEach((el) => {
            gsap.from(el, {
                y: 32, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            });
        });

        gsap.utils.toArray('.csr-card').forEach((el, i) => {
            gsap.from(el, {
                y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
                delay: (i % 3) * 0.08,
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });
    }, { scope: rootRef });

    const heading = (eyebrow, title) => (
        <div className="csr-reveal csr-head">
            <span className="csr-eyebrow">{eyebrow}</span>
            <h2 className="csr-title">{title}</h2>
        </div>
    );

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/community-outreach.jpg"
                label="CORPORATE SOCIAL RESPONSIBILITY"
                title="Community Outreach"
                accent="& Welfare"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Sustainability' },
                    { label: 'CSR Activities' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="csr-reveal csr-lede">
                    Anwar Group and Anwar Ispat stand close to communities — funding schools,
                    distributing scholarships, and running medical camps for low-income families.
                </p>

                <div className="csr-reveal csr-stats">
                    {STATS.map((s) => (
                        <div key={s.l} className="csr-stat">
                            <span className="csr-stat-n">{s.n}</span>
                            <span className="csr-stat-l">{s.l}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* MISSION & VISION */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
            }}>
                <div style={CONTAINER}>
                    <div className="csr-principles">
                        {PRINCIPLES.map((p) => (
                            <article key={p.label} className="csr-reveal csr-principle">
                                <span className="csr-eyebrow">{p.label}</span>
                                <h2 className="csr-principle-title">{p.title}</h2>
                                <span className="csr-principle-rule" aria-hidden="true" />
                                <p className="csr-principle-text">{p.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* INITIATIVES */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
            }}>
                {heading('CSR INITIATIVES', 'What we do')}

                <div className="csr-grid">
                    {INITIATIVES.map(({ icon: Icon, title, text }) => (
                        <article key={title} className="csr-card">
                            <span className="csr-card-icon">
                                <Icon size={20} strokeWidth={1.6} />
                            </span>
                            <h3 className="csr-card-title">{title}</h3>
                            <p className="csr-card-text">{text}</p>
                            <span className="csr-card-rule" aria-hidden="true" />
                        </article>
                    ))}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* COMMITMENT */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
            }}>
                <div style={CONTAINER}>
                    {heading('OUR COMMITMENT', 'Standing close to communities')}

                    <div className="csr-commit">
                        {COMMITMENT.map((t) => (
                            <p key={t.slice(0, 24)} className="csr-reveal">{t}</p>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SustainabilityCSRPage;
