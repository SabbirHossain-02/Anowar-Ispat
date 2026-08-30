import React, { useRef, useState, useEffect } from 'react';
import { History, Cpu, Rocket, ShieldCheck, Microscope, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// স্লাইডে যে শব্দগুলো মোটা করা ছিল সেগুলোই <b> — পড়ার সময় চোখ
// ওখানেই আটকায়, তাই দাবিগুলো দ্রুত বোঝা যায়
const B = ({ children }) => (
    <b style={{ color: 'var(--text)', fontWeight: 700 }}>{children}</b>
);

const WHY = [
    {
        icon: History,
        title: '190+ Years of Legacy',
        body: <>Part of the prestigious <B>Anwar Group</B>, building trust in Bangladesh since 1834.</>,
    },
    {
        icon: Cpu,
        title: 'European Technology',
        body: <>The only manufacturer in Bangladesh using patented <B>TMT technology from Belgium</B> for superior reinforcement.</>,
    },
    {
        icon: Rocket,
        title: 'Pioneer in Innovation',
        body: <>The trailblazer in the Bangladesh steel industry, being the first to introduce <B>60-Grade reinforcement bars</B> to the country.</>,
    },
    {
        icon: ShieldCheck,
        title: 'Earthquake Resistant',
        body: <>Engineered with a high <B>TS/YS ratio</B> for maximum ductility, meeting strict <B>BNBC and ACI</B> safety codes.</>,
    },
    {
        icon: Microscope,
        title: 'Precision Quality',
        body: <>Every batch is tested via <B>Spectrometer</B> (28-element analysis) to ensure 100% compliance with <B>BSTI and ISO</B> standards.</>,
    },
    {
        icon: Building2,
        title: 'Nation Builder',
        body: <>A proven partner for Bangladesh's iconic mega-projects and thousands of individual homes.</>,
    },
];

// পুরো পেজে একটাই স্পেসিং স্কেল
const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

const AboutUsPage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

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
                image="/about-banner.jpeg"
                label="ABOUT US"
                title="Forged in Fire, Built for"
                accent="Eternity"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'About us' },
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
                    As a proud concern of the century-old Anwar Group, Anwar Ispat has led the mild steel
                    industry since 1978. We were the first to introduce 60-grade steel to Bangladesh and
                    have consistently upgraded our facilities to bring the world's most advanced technology
                    to the local market. From the tallest skyscrapers to complex nuclear power plants, our
                    commitment to quality ensures that every structure built with Anwar Ispat is resilient,
                    durable, and safe.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* WHY ANWAR ISPAT */}
            {/* ---------------------------------------------------------- */}
            {/* লিডারশিপ সরানোর পর এটিই শেষ সেকশন, তাই ফুটারের আগে
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
                            WHY ANWAR ISPAT
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                            fontWeight: 800, margin: '0.8rem 0 0', letterSpacing: '0.02em',
                        }}>
                            Six reasons builders choose us
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        columnGap: 'clamp(2rem, 5vw, 4.5rem)',
                    }}>
                        {WHY.map(({ icon: Icon, title, body }, i) => (
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
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUsPage;
