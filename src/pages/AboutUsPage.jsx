import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LEADERSHIP = [
    {
        name: 'Manwar Hossain',
        role: 'Chairman',
        org: 'Anwar Group of Industries',
        photo: '/Manwar-Hossain-transparent-1by1-ar.png',
        bio: `Manwar Hossain succeeded his Father, founder of the conglomerate, Late Anwar Hossain as the new chairman of Anwar Group of Industries in September 2021. He is the eldest son of Late Anwar Hossain and Bibi Amena. He was sent to St Paul's School Darjeeling, India under the tutorship of Harry Dang. Later, he went to the University of New Hampshire, USA and completed his MBA in 1992. He joined the family business in 1993. Under his leadership, the group continues to expand its industrial footprint across Bangladesh.`,
    },
    {
        name: 'Furkaan N Hossain',
        role: 'Deputy Managing Director',
        org: 'Anwar Group of Industries',
        photo: '/Furkaan-Hossain-transparent-1by1-ar.png',
        bio: `Mr. Furkaan N Hossain joined Anwar Group as the Deputy Managing Director and oversees Anwar Ispat, Anwar Cement, Anwar Cement Sheet, and A1 Polymer. He is also the Founder Deputy Managing Director of Anwar Technologies, a venture he established in 2021 to lead the group's transformation in the technology sector. In addition, he is responsible for leading the Building Material Division, driving strategic initiatives across the group's industrial operations. With a Bachelor of Science degree in Computer Science from Colorado State University, Mr. Furkaan showcases exceptional technical acumen and market insights in his role. He envisions Anwar Technologies as a global tech powerhouse, driving the organization toward exponential growth. Mr. Furkaan fosters a culture of innovation, collaboration, and excellence, empowering his team to thrive in the ever-evolving technology landscape. Beyond his professional endeavors, he actively advocates for leveraging technology for social good, supporting initiatives that bridge the digital divide and empower underserved communities. With his blend of technical expertise, strategic thinking, and passion for positive impact, Mr. Furkaan Hossain is propelling Anwar Technologies and the wider Anwar Group to new heights in the technology and manufacturing industries.`,
    },
    {
        name: 'Waeez R Hossain',
        role: 'Deputy Managing Director',
        org: 'Anwar Group of Industries',
        photo: '/Waeez-R-Hossain-transparent-1by1-ar.png',
        bio: `Mr. Waeez R Hossain joined Anwar Group of Industries in 2022 as the Deputy Managing Director and currently oversees Anwar Ispat, Anwar Cement, Anwar Cement Sheet, and A1 Polymer. He is also the Founder Deputy Managing Director of Anwar Technologies, a venture established to lead the group's transformation in the technology sector. In addition, he is responsible for leading the Building Material Division, driving strategic initiatives across the group's industrial operations. With an MBA from Georgetown University McDonough School of Business and a Bachelor's degree in Marketing & Management from Northeastern University, he brings a strong educational foundation and global perspective to his role. His strategic thinking and hands-on approach have successfully guided the division toward growth, efficiency, and innovation. Mr. Waeez fosters a collaborative work environment, empowering his teams to lead transformative projects that align with the group's long-term vision. Beyond his professional responsibilities, he actively supports community initiatives focused on sustainable development and social welfare. With his entrepreneurial spirit, forward-thinking leadership, and commitment to excellence, Mr. Waeez R Hossain is playing a vital role in advancing the Building Materials sector within Anwar Group of Industries.`,
    },
];

const AboutUsPage = () => {
    const rootRef = useRef(null);
    const bannerRef = useRef(null);
    const bannerImgRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ব্যানার শুরুতে দুই পাশে জায়গা রেখে বসে, স্ক্রলের সাথে
        // ধীরে ধীরে ফুল স্ক্রিন হয়ে যায়। clip-path ব্যবহার করছি কারণ
        // width বদলালে প্রতি ফ্রেমে layout হিসাব হয়, ফলে আটকে আটকে চলে।
        if (!reduced && bannerRef.current) {
            gsap.fromTo(
                bannerRef.current,
                { clipPath: 'inset(0% 7% 0% 7% round 20px)' },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bannerRef.current,
                        start: 'top top',
                        end: '+=420',
                        scrub: 0.6,
                    },
                }
            );

            gsap.fromTo(
                bannerImgRef.current,
                { scale: 1.18 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bannerRef.current,
                        start: 'top top',
                        end: '+=420',
                        scrub: 0.6,
                    },
                }
            );
        }

        gsap.from('.ab-hero-line', {
            y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15,
        });

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
            {/* ---------------------------------------------------------- */}
            {/* HERO BANNER — স্ক্রলে দুই পাশ থেকে খুলে ফুল স্ক্রিন হয় */}
            {/* ---------------------------------------------------------- */}
            <section
                ref={bannerRef}
                style={{
                    position: 'relative',
                    height: isMobile ? '68vh' : 'min(88vh, 820px)',
                    marginTop: '72px',
                    overflow: 'hidden',
                    willChange: 'clip-path',
                    // ব্যানারের ছবি লোড হওয়ার আগে বা না থাকলেও যেন ফাঁকা সাদা না দেখায়
                    background: 'linear-gradient(140deg, #1b2733 0%, #0d1319 60%, #1a0e11 100%)',
                }}
            >
                <img
                    ref={bannerImgRef}
                    src="/about-banner.jpeg"
                    alt="Anwar Ispat manufacturing facility"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', willChange: 'transform',
                    }}
                />
                {/* লেখা পড়ার জন্য নিচ থেকে গাঢ় হয়ে আসা আবরণ */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.12) 100%)',
                }} />

                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', padding: isMobile ? '0 8%' : '0 9%',
                }}>
                    <span className="ab-hero-line" style={{
                        fontFamily: 'var(--font-main)', fontSize: '0.8rem', fontWeight: 700,
                        letterSpacing: '0.32em', color: '#fff', opacity: 0.9, marginBottom: '1.1rem',
                    }}>
                        ABOUT US
                    </span>
                    <h1 className="ab-hero-line" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
                        lineHeight: 1.02, fontWeight: 800, letterSpacing: '0.01em',
                        color: '#fff', margin: 0, maxWidth: '16ch',
                        textShadow: '0 4px 30px rgba(0,0,0,0.45)',
                    }}>
                        Forged in Fire,<br />Built for <span style={{ color: 'var(--accent)' }}>Eternity</span>
                    </h1>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* BREADCRUMB */}
            {/* ---------------------------------------------------------- */}
            <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.75rem 5% 0' }}>
                <nav style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    fontSize: '0.82rem', color: 'var(--subtext)',
                    paddingBottom: '1.4rem', borderBottom: '1px solid var(--glass-border)',
                }}>
                    <Link to="/" style={{ color: 'var(--subtext)', textDecoration: 'none' }}>Home</Link>
                    <span style={{ opacity: 0.5 }}>&gt;</span>
                    <span style={{ color: 'var(--text)' }}>About us</span>
                </nav>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* BACKGROUND */}
            {/* ---------------------------------------------------------- */}
            <section style={{ maxWidth: '980px', margin: '0 auto', padding: 'clamp(3.5rem, 8vw, 6.5rem) 5%' }}>
                <p className="ab-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1.05rem, 2vw, 1.45rem)',
                    lineHeight: 1.75, color: 'var(--text)', textAlign: 'center', margin: 0,
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
            {/* LEADERSHIP */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                padding: 'clamp(3rem, 7vw, 5.5rem) 0 clamp(5rem, 10vw, 8rem)',
                background: 'var(--glass)',
                borderTop: '1px solid var(--glass-border)',
            }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 5%' }}>
                    <div className="ab-reveal" style={{ marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                        <span style={{
                            fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.28em', color: 'var(--accent)',
                        }}>
                            // OUR LEADERSHIP
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                            fontWeight: 800, margin: '0.8rem 0 0', letterSpacing: '0.02em',
                        }}>
                            The people behind the steel
                        </h2>
                    </div>

                    {LEADERSHIP.map((person, i) => (
                        <article
                            key={person.name}
                            className="ab-reveal"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
                                gap: isMobile ? '1.75rem' : 'clamp(2.5rem, 5vw, 4.5rem)',
                                alignItems: 'start',
                                padding: 'clamp(2rem, 5vw, 3.5rem) 0',
                                borderTop: i === 0 ? 'none' : '1px solid var(--glass-border)',
                                direction: !isMobile && i % 2 === 1 ? 'rtl' : 'ltr',
                            }}
                        >
                            <div style={{ direction: 'ltr' }}>
                                <div style={{
                                    position: 'relative',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'linear-gradient(160deg, rgba(227,24,45,0.14) 0%, var(--surface) 70%)',
                                    border: '1px solid var(--glass-border)',
                                    aspectRatio: '1 / 1',
                                    maxWidth: isMobile ? '260px' : 'none',
                                }}>
                                    <img
                                        src={person.photo}
                                        alt={person.name}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                </div>
                            </div>

                            <div style={{ direction: 'ltr' }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                    fontWeight: 800, margin: 0, letterSpacing: '0.02em',
                                }}>
                                    {person.name}
                                </h3>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 600,
                                    letterSpacing: '0.14em', textTransform: 'uppercase',
                                    color: 'var(--accent)', margin: '0.6rem 0 0.2rem',
                                }}>
                                    {person.role}
                                </p>
                                <p style={{
                                    fontFamily: 'var(--font-main)', fontSize: '0.82rem',
                                    color: 'var(--subtext)', margin: '0 0 1.5rem',
                                }}>
                                    {person.org}
                                </p>
                                <div style={{
                                    width: '48px', height: '3px', background: 'var(--accent)',
                                    borderRadius: '2px', marginBottom: '1.5rem',
                                }} />
                                <p style={{
                                    fontFamily: 'var(--font-main)',
                                    fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
                                    lineHeight: 1.85, color: 'var(--subtext)', margin: 0,
                                }}>
                                    {person.bio}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
