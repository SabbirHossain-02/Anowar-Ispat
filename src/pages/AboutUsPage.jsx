import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';

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
            {/* LEADERSHIP */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
                paddingLeft: 0,
                paddingRight: 0,
                background: 'var(--glass)',
                borderTop: '1px solid var(--glass-border)',
            }}>
                <div style={CONTAINER}>
                    <div className="ab-reveal" style={{ marginBottom: SECTION_PAD }}>
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
                                gap: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3.5rem)',
                                alignItems: 'start',
                                padding: `${SECTION_PAD} 0`,
                                borderTop: i === 0 ? 'none' : '1px solid var(--glass-border)',
                                direction: !isMobile && i % 2 === 1 ? 'rtl' : 'ltr',
                            }}
                        >
                            <div style={{ direction: 'ltr' }}>
                                {/* ছবিগুলো transparent cutout এবং ২:৩ পোর্ট্রেট।
                                    তাই বক্সও পোর্ট্রেট, আর contain — cover দিলে
                                    মাথা বা পা কেটে যায়। figure নিচে বসে থাকে,
                                    যেন গ্রেডিয়েন্টের ওপর দাঁড়িয়ে আছে। */}
                                <div style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    aspectRatio: '3 / 4',
                                    background: 'linear-gradient(165deg, rgba(227,24,45,0.16) 0%, var(--surface) 55%, var(--glass) 100%)',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: 'var(--card-shadow)',
                                    maxWidth: isMobile ? '300px' : 'none',
                                    marginInline: isMobile ? 'auto' : 0,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                }}>
                                    {/* পায়ের কাছে নরম আভা — figure যেন ভেসে না থাকে */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'radial-gradient(ellipse 72% 52% at 50% 100%, rgba(227,24,45,0.22) 0%, transparent 72%)',
                                    }} />
                                    <img
                                        src={person.photo}
                                        alt={person.name}
                                        loading="lazy"
                                        style={{
                                            position: 'relative',
                                            width: '100%', height: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'bottom center',
                                            display: 'block',
                                        }}
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
