import React, { useRef, useState, useEffect } from 'react';
import { Eye, Target, Lightbulb, Layers, Leaf, Award, Users } from 'lucide-react';
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

const VALUES = [
    {
        icon: Lightbulb,
        title: 'Continuous Innovation',
        text: 'Aspire to continuously introduce new products and services to support the economic growth of Bangladesh.',
    },
    {
        icon: Layers,
        title: 'Business Diversity',
        text: 'Strive to maintain our position as the most diversified group in Bangladesh, to respond efficiently to evolving customer needs and market trends.',
    },
    {
        icon: Leaf,
        title: 'Environmental Consciousness',
        text: 'Embrace environmental responsibility and social accountability by adhering to sustainable and ethical business practices.',
    },
    {
        icon: Award,
        title: 'Quality Leadership',
        text: 'Uphold a reputation for quality leadership in every industry we operate in by upholding the highest standards of quality in all our products and services.',
    },
    {
        icon: Users,
        title: 'Employee Friendliness',
        text: 'Facilitate professional growth of our people through investment in training and development programs.',
    },
];

const VisionMissionPage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.vm-reveal').forEach((el) => {
            gsap.from(el, {
                y: 44, opacity: 0, duration: 0.8, ease: 'power3.out',
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
                image="/vision-mission.jpeg"
                label="VISION, MISSION & VALUES"
                title="Since 1834,"
                accent="Forged in Purpose"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'About us', to: '/about' },
                    { label: 'Vision, Mission & Values' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="vm-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)', textAlign: 'center',
                    margin: '0 auto', maxWidth: '860px',
                }}>
                    Since 1834, Anwar Group has been at the forefront of industry in Bangladesh,
                    evolving from a single trading operation to a diverse set of ventures.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* VISION + MISSION */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)',
            }}>
                <div style={{
                    ...CONTAINER,
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1.35fr',
                    gap: 'clamp(1.25rem, 2.5vw, 2rem)',
                    alignItems: 'stretch',
                }}>
                    {[
                        {
                            icon: Eye,
                            tag: 'Vision',
                            title: 'Continuing the heritage',
                            body: 'Continuing the heritage of being pioneers in industries and leaders in development.',
                            accent: true,
                        },
                        {
                            icon: Target,
                            tag: 'Mission',
                            title: 'Transformative growth',
                            body: 'At Anwar Group, our vision and mission converge in a steadfast pursuit of transformative growth and societal progress. Rooted in our heritage, we strive to lead across industries, embracing sustainability and ethics. Through innovation and global expansion, we contribute to economic development. Empowered by excellence and a limitless mindset, we shape a meaningful future.',
                        },
                    ].map(({ icon: Icon, tag, title, body, accent }) => (
                        <article key={tag} className="vm-reveal" style={{
                            background: accent
                                ? 'linear-gradient(165deg, rgba(227,24,45,0.10) 0%, var(--surface) 60%)'
                                : 'var(--surface)',
                            border: `1px solid ${accent ? 'rgba(227,24,45,0.28)' : 'var(--glass-border)'}`,
                            borderRadius: '18px',
                            padding: 'clamp(1.5rem, 3vw, 2.4rem)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
                                <span style={{
                                    width: '42px', height: '42px', borderRadius: '11px',
                                    background: 'var(--accent)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <Icon size={20} color="#fff" />
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                                    letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)',
                                }}>
                                    {tag}
                                </span>
                            </div>

                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                                fontWeight: 800, letterSpacing: '0.02em', margin: '0 0 0.9rem',
                            }}>
                                {title}
                            </h2>

                            <div style={{ width: '44px', height: '3px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '1.2rem' }} />

                            <p style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
                                lineHeight: 1.85, color: 'var(--subtext)', margin: 0,
                            }}>
                                {body}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* VALUES */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0, paddingRight: 0,
            }}>
                <div style={CONTAINER}>
                    <div className="vm-reveal" style={{ marginBottom: SECTION_PAD }}>
                        <span style={{
                            fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.28em', color: 'var(--accent)',
                        }}>
                            // OUR VALUES
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                            fontWeight: 800, margin: '0.8rem 0 0', letterSpacing: '0.02em',
                        }}>
                            What we hold to
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? '1fr'
                            : 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'clamp(1rem, 2vw, 1.5rem)',
                    }}>
                        {VALUES.map(({ icon: Icon, title, text }, i) => (
                            <article key={title} className="vm-reveal" style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                {/* কোণায় হালকা ক্রমিক সংখ্যা — কার্ডগুলো একঘেয়ে না লাগার জন্য */}
                                <span aria-hidden="true" style={{
                                    position: 'absolute', top: '0.6rem', right: '1rem',
                                    fontFamily: 'var(--font-heading)', fontSize: '3.2rem',
                                    fontWeight: 800, lineHeight: 1,
                                    color: 'var(--accent)', opacity: 0.09,
                                }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <span style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: 'rgba(227,24,45,0.12)',
                                    border: '1px solid rgba(227,24,45,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.1rem',
                                }}>
                                    <Icon size={19} color="var(--accent)" />
                                </span>

                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                                    fontWeight: 800, letterSpacing: '0.03em',
                                    margin: '0 0 0.7rem',
                                }}>
                                    {title}
                                </h3>

                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.93rem',
                                    lineHeight: 1.8, color: 'var(--subtext)', margin: 0,
                                }}>
                                    {text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisionMissionPage;
