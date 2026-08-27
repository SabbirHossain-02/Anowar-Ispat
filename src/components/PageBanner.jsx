import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * ভেতরের পেজগুলোর হেডার ব্যানার।
 *
 * পেজ খোলার সাথে সাথে ব্যানারটা দুই পাশ থেকে খুলে ফুল স্ক্রিন হয়।
 * clip-path অ্যানিমেট করা হয়, width নয় — width বদলালে ব্রাউজারকে প্রতি
 * ফ্রেমে পুরো পেজের layout নতুন করে হিসাব করতে হয়, ফলে আটকে আটকে চলে।
 *
 * crumbs: [{ label, to }] — শেষটির `to` না দিলে সেটি বর্তমান পেজ হিসেবে দেখায়
 */
const PageBanner = ({ image, label, title, accent, crumbs = [] }) => {
    const bannerRef = useRef(null);
    const imgRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    // নেভবার fixed এবং তার উচ্চতা স্ক্রিন অনুযায়ী বদলায়, তাই মেপে নিই
    const [navH, setNavH] = useState(96);

    useEffect(() => {
        const measure = () => {
            setIsMobile(window.innerWidth < 900);
            const nav = document.querySelector('.navbar');
            if (nav) setNavH(nav.offsetHeight);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useGSAP(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduced || !bannerRef.current) {
            gsap.from('.pb-line', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' });
            return;
        }

        const tl = gsap.timeline({ delay: 1.2 });

        tl.fromTo(
            bannerRef.current,
            { clipPath: 'inset(0% 8% 0% 8% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.6, ease: 'power2.inOut' },
            0
        );

        // ফ্রেম বাইরে খুলছে আর ছবি ভেতরে গুটিয়ে আসছে — একসাথে হলে
        // গভীরতার অনুভূতি তৈরি হয়, নইলে ছবি পাশে সরে যাচ্ছে মনে হয়
        tl.fromTo(imgRef.current, { scale: 1.22 }, { scale: 1, duration: 2, ease: 'power2.out' }, 0);

        tl.from('.pb-line', { y: 38, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.55);
    }, { scope: bannerRef });

    return (
        <>
            <section
                ref={bannerRef}
                style={{
                    minHeight: 'auto',
                    display: 'block',
                    position: 'relative',
                    // নেভবারের ঠিক নিচ থেকে শুরু। ভিউপোর্টের পুরোটা না নিয়ে
                    // নিচে কিছুটা ছেড়ে রাখি, যাতে ব্রেডক্রাম্বটুকু চোখে পড়ে।
                    marginTop: `${navH}px`,
                    height: `max(420px, calc(100vh - ${navH}px - 104px))`,
                    overflow: 'hidden',
                    willChange: 'clip-path',
                    padding: 0,
                    // ছবি লোড হওয়ার আগে বা না থাকলেও যেন ফাঁকা সাদা না দেখায়
                    background: 'linear-gradient(140deg, #1b2733 0%, #0d1319 60%, #1a0e11 100%)',
                }}
            >
                <img
                    ref={imgRef}
                    src={image}
                    alt={typeof title === 'string' ? title : ''}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', willChange: 'transform',
                    }}
                />

                {/* ছবির উজ্জ্বল অংশে সাদা লেখাও পড়া যায় না, তাই দুই স্তরের আবরণ */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.74) 32%, rgba(0,0,0,0.42) 62%, rgba(0,0,0,0.15) 100%)',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)',
                }} />

                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', padding: isMobile ? '0 8%' : '0 9%',
                }}>
                    <span className="pb-line ab-hero-label" style={{
                        fontFamily: 'var(--font-main)', fontSize: '0.8rem', fontWeight: 700,
                        letterSpacing: '0.32em', marginBottom: '1.1rem',
                    }}>
                        {label}
                    </span>
                    <h1 className="pb-line ab-hero-title" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5.4vw, 4.6rem)',
                        lineHeight: 1.05, fontWeight: 800, letterSpacing: '0.01em',
                        margin: 0, maxWidth: '13ch',
                    }}>
                        {title}
                        {accent && <> <span className="ab-accent">{accent}</span></>}
                    </h1>
                </div>
            </section>

            {crumbs.length > 0 && (
                <div style={{
                    maxWidth: '1180px', margin: '0 auto',
                    padding: '1.15rem clamp(1.25rem, 5vw, 3rem) 0',
                }}>
                    <nav style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap',
                        fontSize: '0.82rem', color: 'var(--subtext)',
                        paddingBottom: '0.9rem', borderBottom: '1px solid var(--glass-border)',
                    }}>
                        {crumbs.map((c, i) => (
                            <React.Fragment key={c.label}>
                                {i > 0 && <span style={{ opacity: 0.5 }}>&gt;</span>}
                                {c.to
                                    ? <Link to={c.to} style={{ color: 'var(--subtext)', textDecoration: 'none' }}>{c.label}</Link>
                                    : <span style={{ color: 'var(--text)' }}>{c.label}</span>}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
};

export default PageBanner;
