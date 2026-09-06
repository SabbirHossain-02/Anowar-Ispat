import React, { useRef } from 'react';
import {
    GraduationCap, HeartPulse, Users, ShieldCheck, Trees, HandHeart,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
import { useContent } from '../lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// আইকন JSON এ রাখা যায় না, তাই কোডেই থাকে এবং ক্রম অনুযায়ী বসে।
// অ্যাডমিনে উদ্যোগ যোগ বা বাদ দিলেও প্রতিটি আইকন পায়।
const ICONS = [GraduationCap, HeartPulse, Users, ShieldCheck, Trees, HandHeart];

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়। কি-গুলো ব্যাকএন্ডের
// content-schema.js এর পথের সাথে হুবহু মেলে।
const DEFAULTS = {
    banner: {
        image: '/community-outreach.jpg',
        label: 'CORPORATE SOCIAL RESPONSIBILITY',
        title: 'Community Outreach',
        accent: '& Welfare',
    },
    open: {
        eyebrow: 'WHERE WE STAND',
        statement: 'Anwar Group and Anwar Ispat stand close to the communities the mill is built in.',
        text: 'Funding schools, distributing scholarships and running medical camps for low-income families — carried on for four decades, not announced for one.',
    },
    figures: [
        { n: '10K+', l: 'Families supported' },
        { n: '500+', l: 'Scholarships awarded' },
        { n: '20+', l: 'Free medical camps' },
        { n: '5,000+', l: 'Trees planted' },
    ],
    principles: [
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
    ],
    what: { eyebrow: 'CSR INITIATIVES', title: 'What we do' },
    initiatives: [
        { title: 'Education', text: 'Funding schools and distributing scholarships so quality education reaches low-income families across Bangladesh.' },
        { title: 'Healthcare', text: 'Free medical camps and healthcare programmes bringing treatment to communities that are otherwise underserved.' },
        { title: 'Community', text: 'A deep-rooted conviction towards people and society, carried out through consistent local engagement.' },
        { title: 'Employee welfare', text: 'Training, safety programmes and wellbeing initiatives for the people who run the mill.' },
        { title: 'Environment', text: 'Reforestation drives and awareness campaigns to preserve the natural heritage of Bangladesh.' },
        { title: 'Social welfare', text: 'Relief programmes, disaster response and social protection for vulnerable groups.' },
    ],
    commit: {
        eyebrow: 'OUR COMMITMENT',
        lead: 'At the heart of our activities is the deep-rooted conviction towards people and society at large, emanating from values that have been in the family for many centuries.',
        text: 'We fund schools, distribute scholarships and run medical camps so that quality healthcare and education reach families who would otherwise go without them.',
    },
};

const SustainabilityCSRPage = () => {
    const rootRef = useRef(null);
    const c = useContent('sustainability-csr', DEFAULTS);

    useGSAP(() => {
        gsap.utils.toArray('.csr-reveal').forEach((el) => {
            gsap.from(el, {
                y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });

        gsap.utils.toArray('.csr-item').forEach((el) => {
            gsap.from(el, {
                y: 26, opacity: 0, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 92%' },
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
                    { label: 'Sustainability' },
                    { label: 'CSR Activities' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* OPENING — বাঁয়ে বিবৃতি, ডানে সংখ্যা, সমান দুই ভাগে নয় */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: '30px',
                paddingBottom: `calc(${SECTION_PAD} * 1.2)`,
            }}>
                <div className="csr-open">
                    <div className="csr-reveal">
                        <span className="csr-eyebrow">{c.open.eyebrow}</span>
                        <p className="csr-statement">{c.open.statement}</p>
                        <p className="csr-statement-sub">{c.open.text}</p>
                    </div>

                    <dl className="csr-reveal csr-figures">
                        {c.figures.map((f) => (
                            <div key={f.l} className="csr-figure">
                                <dt className="csr-figure-n">{f.n}</dt>
                                <dd className="csr-figure-l">{f.l}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* MISSION & VISION — দ্বিতীয়টি একটু নিচে নামানো */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
            }}>
                <div style={CONTAINER}>
                    <div className="csr-principles">
                        {c.principles.map((p) => (
                            <article key={p.label} className="csr-reveal csr-principle">
                                <span className="csr-eyebrow">{p.label}</span>
                                <h2 className="csr-principle-title">{p.title}</h2>
                                <p className="csr-principle-text">{p.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* INITIATIVES — বাক্স নয়, প্রতিটি একটি চওড়া সারি */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: `calc(${SECTION_PAD} * 1.2)`,
                paddingBottom: SECTION_PAD,
            }}>
                <div className="csr-reveal csr-what">
                    <span className="csr-eyebrow">{c.what.eyebrow}</span>
                    <h2 className="csr-what-title">{c.what.title}</h2>
                </div>

                <div className="csr-list">
                    {c.initiatives.map(({ title, text }, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                        <article key={title + i} className="csr-item">
                            <div className="csr-item-mark">
                                <span className="csr-item-n">{String(i + 1).padStart(2, '0')}</span>
                                <span className="csr-item-icon"><Icon size={19} strokeWidth={1.6} /></span>
                            </div>
                            <h3 className="csr-item-title">{title}</h3>
                            <p className="csr-item-text">{text}</p>
                        </article>
                        );
                    })}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* COMMITMENT — সরু মাপে, ডান দিকে সরানো */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
            }}>
                <div style={CONTAINER}>
                    <div className="csr-commit csr-reveal">
                        <span className="csr-eyebrow">{c.commit.eyebrow}</span>
                        <p className="csr-commit-lead">{c.commit.lead}</p>
                        <p className="csr-commit-text">{c.commit.text}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SustainabilityCSRPage;
