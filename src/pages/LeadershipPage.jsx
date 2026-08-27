import React, { useRef, useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Building2 } from 'lucide-react';
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

const LEADERS = [
    {
        name: 'Manwar Hossain',
        role: 'Chairman',
        org: 'Anwar Group of Industries',
        photo: '/Manwar-Hossain-transparent-1by1-ar.png',
        bio: [
            `Manwar Hossain succeeded his father, the founder of the conglomerate, Late Anwar Hossain, as Chairman of Anwar Group of Industries in September 2021. He is the eldest son of Late Anwar Hossain and Bibi Amena.`,
            `He was sent to St Paul's School, Darjeeling, under the tutorship of Harry Dang, and later completed his MBA at the University of New Hampshire in 1992. He joined the family business in 1993, and under his leadership the group continues to expand its industrial footprint across Bangladesh.`,
        ],
        facts: [
            { icon: GraduationCap, label: 'Education', value: 'MBA, University of New Hampshire' },
            { icon: Briefcase, label: 'Joined the group', value: '1993' },
            { icon: Building2, label: 'Chairman since', value: 'September 2021' },
        ],
    },
    {
        name: 'Furkaan N Hossain',
        role: 'Deputy Managing Director',
        org: 'Anwar Group of Industries',
        photo: '/Furkaan-Hossain-transparent-1by1-ar.png',
        bio: [
            `Furkaan N Hossain joined Anwar Group as Deputy Managing Director and oversees Anwar Ispat, Anwar Cement, Anwar Cement Sheet and A1 Polymer. He is also the founding Deputy Managing Director of Anwar Technologies, established in 2021 to lead the group's transformation in the technology sector.`,
            `He is responsible for the Building Material Division, driving strategic initiatives across the group's industrial operations. He envisions Anwar Technologies as a global technology business, and fosters a culture of innovation, collaboration and excellence. Beyond his professional work, he advocates for technology in the service of social good, supporting initiatives that bridge the digital divide.`,
        ],
        facts: [
            { icon: GraduationCap, label: 'Education', value: 'BSc Computer Science, Colorado State University' },
            { icon: Briefcase, label: 'Also serves as', value: 'Founding Deputy MD, Anwar Technologies' },
            { icon: Building2, label: 'Oversees', value: 'Anwar Ispat, Anwar Cement, Anwar Cement Sheet, A1 Polymer' },
        ],
    },
    {
        name: 'Waeez R Hossain',
        role: 'Deputy Managing Director',
        org: 'Anwar Group of Industries',
        photo: '/Waeez-R-Hossain-transparent-1by1-ar.png',
        bio: [
            `Waeez R Hossain joined Anwar Group of Industries in 2022 as Deputy Managing Director and oversees Anwar Ispat, Anwar Cement, Anwar Cement Sheet and A1 Polymer. He is also a founding Deputy Managing Director of Anwar Technologies.`,
            `He leads the Building Material Division, where his strategic thinking and hands-on approach have guided the division toward growth, efficiency and innovation. He fosters a collaborative working environment, and supports community initiatives focused on sustainable development and social welfare.`,
        ],
        facts: [
            { icon: GraduationCap, label: 'Education', value: 'MBA, Georgetown University McDonough School of Business' },
            { icon: Briefcase, label: 'Joined the group', value: '2022' },
            { icon: Building2, label: 'Leads', value: 'Building Material Division' },
        ],
    },
];

const LeadershipPage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.ld-reveal').forEach((el) => {
            gsap.from(el, {
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
            });
        });
    }, { scope: rootRef });

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/Leadership-banner.jpeg"
                label="LEADERSHIP"
                title="Steering the"
                accent="Legacy"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'About us', to: '/about' },
                    { label: 'Leadership Team' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="ld-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)',
                    margin: 0, maxWidth: '62ch',
                }}>
                    Anwar Ispat is led by the third and fourth generations of the Anwar family, who carry
                    the standards of a business trading since 1834 into a modern steel operation.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* PROFILES */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: 0,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    {LEADERS.map((person, i) => (
                        <article
                            key={person.name}
                            className="ld-reveal"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '4fr 6fr',
                                gap: isMobile ? '1.75rem' : 'clamp(2.5rem, 5vw, 4.5rem)',
                                alignItems: 'start',
                                padding: `${SECTION_PAD} 0`,
                                borderTop: i === 0 ? 'none' : '1px solid var(--glass-border)',
                                direction: !isMobile && i % 2 === 1 ? 'rtl' : 'ltr',
                            }}
                        >
                            {/* ছবি — transparent cutout, ২:৩ পোর্ট্রেট, তাই contain
                                এবং নিচে সংযুক্ত, নইলে মাথা বা পা কেটে যায় */}
                            <div style={{ direction: 'ltr' }}>
                                <div style={{
                                    position: 'relative',
                                    aspectRatio: '3 / 4',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    background: 'var(--glass)',
                                    borderBottom: '3px solid var(--accent)',
                                    maxWidth: isMobile ? '300px' : 'none',
                                    marginInline: isMobile ? 'auto' : 0,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                }}>
                                    <img
                                        src={person.photo}
                                        alt={person.name}
                                        loading="lazy"
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'bottom center',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ direction: 'ltr' }}>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.76rem', fontWeight: 700,
                                    letterSpacing: '0.2em', textTransform: 'uppercase',
                                    color: 'var(--accent)', margin: '0 0 0.75rem',
                                }}>
                                    {person.role}
                                </p>

                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)',
                                    fontWeight: 800, letterSpacing: '0.01em',
                                    margin: 0, lineHeight: 1.1,
                                }}>
                                    {person.name}
                                </h2>

                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.86rem',
                                    color: 'var(--subtext)', margin: '0.55rem 0 0',
                                }}>
                                    {person.org}
                                </p>

                                {person.bio.map((para) => (
                                    <p key={para.slice(0, 40)} style={{
                                        fontFamily: 'var(--font-main)',
                                        fontSize: 'clamp(0.93rem, 1.25vw, 1.02rem)',
                                        lineHeight: 1.85, color: 'var(--subtext)',
                                        margin: '1.35rem 0 0', maxWidth: '58ch',
                                    }}>
                                        {para}
                                    </p>
                                ))}

                                {/* বায়োর ভেতর ছড়িয়ে থাকা মূল তথ্যগুলো আলাদা করে
                                    রাখা — কেউ পুরো লেখা না পড়েও দেখে নিতে পারেন */}
                                <dl style={{
                                    margin: 'clamp(1.6rem, 2.6vw, 2.2rem) 0 0',
                                    display: 'grid',
                                    gap: '0',
                                    borderTop: '1px solid var(--glass-border)',
                                }}>
                                    {person.facts.map(({ icon: Icon, label, value }) => (
                                        <div key={label} style={{
                                            display: 'grid',
                                            gridTemplateColumns: isMobile ? 'auto 1fr' : '18px 150px 1fr',
                                            gap: '0.9rem',
                                            alignItems: 'baseline',
                                            padding: '0.85rem 0',
                                            borderBottom: '1px solid var(--glass-border)',
                                        }}>
                                            <Icon size={15} color="var(--accent)" style={{ alignSelf: 'center' }} />
                                            <dt style={{
                                                fontFamily: 'var(--font-main)', fontSize: '0.72rem',
                                                fontWeight: 700, letterSpacing: '0.14em',
                                                textTransform: 'uppercase', color: 'var(--subtext)',
                                                gridColumn: isMobile ? '2' : 'auto',
                                            }}>
                                                {label}
                                            </dt>
                                            <dd style={{
                                                fontFamily: 'var(--font-main)', fontSize: '0.93rem',
                                                lineHeight: 1.6, color: 'var(--text)', margin: 0,
                                                gridColumn: isMobile ? '2' : 'auto',
                                            }}>
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LeadershipPage;
