import React, { useRef, useState, useEffect } from 'react';
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

// স্লাইডে আটটি সার্টিফিকেট একসাথে সাজানো ছিল, কিন্তু সেগুলো তিন
// রকমের জিনিস — পণ্য কোন মানে তৈরি, প্রতিষ্ঠান কীভাবে চলে, আর
// বাইরের কেউ পরীক্ষা করেছে কি না। আলাদা করলে অর্থটা স্পষ্ট হয়।
const GROUPS = [
    {
        eyebrow: 'PRODUCT STANDARDS',
        title: 'What the bar is made to',
        note: 'The specifications the rebar itself is manufactured and tested against.',
        items: [
            { code: 'BSTI', body: 'Bangladesh Standards and Testing Institution', note: 'Certified for standard quality' },
            { code: 'BDS ISO 6935-2:2021', body: 'Bangladesh Standard for ribbed bars', note: 'Steel for the reinforcement of concrete' },
            { code: 'BS-4449', body: 'British Standards Institution', note: 'Certified for British-standard quality' },
            { code: 'IS-1786', body: 'Bureau of Indian Standards', note: 'Certified for strength and flexibility' },
            { code: 'ASTM-A615 & A706', body: 'ASTM International', note: 'Certified for seismic safety' },
        ],
    },
    {
        eyebrow: 'MANAGEMENT SYSTEMS',
        title: 'How the mill is run',
        note: 'Audited systems covering how the plant produces and how it treats its surroundings.',
        items: [
            { code: 'ISO 9001:2015', body: 'Quality Management System', note: 'QMS certificate' },
            { code: 'ISO 14001:2015', body: 'Environmental Management System', note: 'EMS certificate' },
        ],
    },
    {
        eyebrow: 'INDEPENDENT TESTING',
        title: 'Checked by others',
        note: 'Verification carried out outside the company.',
        items: [
            { code: 'BUET', body: 'Bangladesh University of Engineering and Technology', note: 'Independently certified' },
        ],
    },
];

const CertificationsPage = () => {
    const rootRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 900);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.ct-reveal').forEach((el) => {
            gsap.from(el, {
                y: 36, opacity: 0, duration: 0.75, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 87%' },
            });
        });
    }, { scope: rootRef });

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/Certifications-page-banner.jpg"
                label="CERTIFICATIONS"
                title="Tested, audited and"
                accent="Certified"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: 'Certifications' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* INTRO */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER, paddingTop: '30px', paddingBottom: '30px',
            }}>
                <p className="ct-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)', margin: 0, maxWidth: '62ch',
                }}>
                    Anwar Ispat rebar is certified against Bangladeshi, British, Indian and American
                    standards, and the mill is audited to ISO quality and environmental management
                    systems.
                </p>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* GROUPS */}
            {/* ---------------------------------------------------------- */}
            {GROUPS.map((group, gi) => (
                <section
                    key={group.eyebrow}
                    style={{
                        minHeight: 'auto', display: 'block',
                        paddingTop: SECTION_PAD,
                        paddingBottom: gi === GROUPS.length - 1
                            ? `calc(${SECTION_PAD} * 1.4)`
                            : SECTION_PAD,
                        paddingLeft: 0, paddingRight: 0,
                        // পরপর সেকশন পালা করে রং বদলায়, নইলে সীমানা বোঝা যায় না
                        background: gi % 2 === 0 ? 'var(--glass)' : 'transparent',
                        borderTop: '1px solid var(--glass-border)',
                    }}
                >
                    <div style={CONTAINER}>
                        <div className="ct-reveal" style={{ marginBottom: SECTION_PAD }}>
                            <span style={{
                                fontFamily: 'var(--font-main)', fontSize: '0.72rem', fontWeight: 700,
                                letterSpacing: '0.28em', color: 'var(--accent)',
                            }}>
                                {group.eyebrow}
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                                fontWeight: 800, margin: '0.8rem 0 0.6rem',
                                letterSpacing: '0.02em', textTransform: 'none',
                            }}>
                                {group.title}
                            </h2>
                            <p style={{
                                fontFamily: 'var(--font-main)', fontSize: '0.93rem',
                                lineHeight: 1.7, color: 'var(--subtext)', margin: 0, maxWidth: '58ch',
                            }}>
                                {group.note}
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile
                                ? 'repeat(auto-fit, minmax(240px, 1fr))'
                                : 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'clamp(1rem, 1.8vw, 1.5rem)',
                        }}>
                            {group.items.map((c) => (
                                <article key={c.code} className="ct-reveal ct-card">
                                    <p className="ct-note">{c.note}</p>
                                    <h3 className="ct-code">{c.code}</h3>
                                    <p className="ct-body">{c.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default CertificationsPage;
