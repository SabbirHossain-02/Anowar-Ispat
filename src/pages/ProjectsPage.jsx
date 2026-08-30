import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
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

// স্লাইডের প্রজেক্টগুলো। ছবি থেকে স্লাইডের লেখা কেটে ফেলা হয়েছে,
// তাই নামটা এখানে টাইপ হিসেবে বসে — ছবির ভেতরে আঁকা নয়।
const PROJECTS = [
    { img: '/padma-bridge.jpg', name: 'Padma Multipurpose Bridge', kind: 'Bridge' },
    { img: '/airport-terminal-3.jpg', name: 'Hazrat Shahjalal International Airport Terminal-3', kind: 'Building' },
    { img: '/rooppur-power-plant.jpg', name: 'Rooppur Nuclear Power Plant', kind: 'Energy' },
    { img: '/bangladesh-bank.jpg', name: 'Bangladesh Bank', kind: 'Building' },
    { img: '/payra-seaport.jpg', name: 'Payra Seaport', kind: 'Port' },
    { img: '/lebukhali-bridge.jpg', name: 'Lebukhali Bridge', kind: 'Bridge' },
    { img: '/purbachal-expressway.jpg', name: 'Purbachal Expressway', kind: 'Expressway' },
    { img: '/dhaka-mawa-expressway.jpg', name: 'Dhaka-Mawa Expressway', kind: 'Expressway' },
    { img: '/hatikumrul-interchange.jpg', name: 'Hatikumrul Interchange', kind: 'Interchange' },
    { img: '/jatrabari-flyover.jpg', name: 'Jatrabari Flyover', kind: 'Flyover' },
    { img: '/city-centre.jpg', name: 'City Center', kind: 'Building' },
    { img: '/banani-bridge.jpg', name: 'Banani Bridge', kind: 'Bridge' },
];

const ProjectsPage = () => {
    const rootRef = useRef(null);
    const [open, setOpen] = useState(null);

    useGSAP(() => {
        gsap.utils.toArray('.gal-item').forEach((el, i) => {
            gsap.from(el, {
                y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
                delay: (i % 3) * 0.07,
                scrollTrigger: { trigger: el, start: 'top 92%' },
            });
        });
    }, { scope: rootRef });

    const step = useCallback((d) => {
        setOpen((i) => (i === null ? i : (i + d + PROJECTS.length) % PROJECTS.length));
    }, []);

    // লাইটবক্স খোলা থাকলে পেছনের স্মুথ স্ক্রল থামে, নইলে ছবির
    // পেছনে পেজ নড়তে থাকে
    useEffect(() => {
        if (open === null) return;
        window.dispatchEvent(new Event('lenis-stop'));
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(null);
            else if (e.key === 'ArrowRight') step(1);
            else if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.dispatchEvent(new Event('lenis-start'));
        };
    }, [open, step]);

    const current = open === null ? null : PROJECTS[open];

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/gallery-banner.jpg"
                label="PROJECT GALLERY"
                title="Built with"
                accent="Anwar Ispat"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Landmarks' },
                    { label: 'Project Gallery' },
                ]}
            />

            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: SECTION_PAD,
                paddingBottom: 'calc(' + SECTION_PAD + ' * 1.4)',
            }}>
                <div className="gal-head">
                    <span className="gal-eyebrow">PROJECT GALLERY</span>
                    <h2 className="gal-title">
                        Twelve structures the country depends on
                    </h2>
                    <p className="gal-lead">
                        Bridges, expressways, ports and power — each one carrying rebar rolled at
                        our mill. Select any project to see it full size.
                    </p>
                </div>

                <div className="gal-grid">
                    {PROJECTS.map((p, i) => (
                        <button
                            key={p.img}
                            type="button"
                            className={i === 0 ? 'gal-item is-feature' : 'gal-item'}
                            onClick={() => setOpen(i)}
                            aria-label={'View ' + p.name}
                        >
                            <img className="gal-img" src={p.img} alt={p.name} loading="lazy" />
                            <span className="gal-scrim" aria-hidden="true" />
                            <span className="gal-zoom" aria-hidden="true"><Maximize2 size={16} /></span>
                            <span className="gal-body">
                                <span className="gal-kind">{p.kind}</span>
                                <span className="gal-name">{p.name}</span>
                                <span className="gal-rule" aria-hidden="true" />
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {current && (
                <div
                    className="gal-lb"
                    role="dialog"
                    aria-modal="true"
                    aria-label={current.name}
                    onClick={() => setOpen(null)}
                >
                    <button type="button" className="gal-lb-close" onClick={() => setOpen(null)} aria-label="Close">
                        <X size={22} />
                    </button>

                    <button
                        type="button"
                        className="gal-lb-nav is-prev"
                        onClick={(e) => { e.stopPropagation(); step(-1); }}
                        aria-label="Previous project"
                    >
                        <ChevronLeft size={26} />
                    </button>

                    {/* ছবির উপর ক্লিক করলে যেন বন্ধ না হয় */}
                    <figure className="gal-lb-figure" onClick={(e) => e.stopPropagation()}>
                        <img src={current.img} alt={current.name} />
                        <figcaption>
                            <span className="gal-lb-kind">{current.kind}</span>
                            <span className="gal-lb-name">{current.name}</span>
                            <span className="gal-lb-count">
                                {String(open + 1).padStart(2, '0')} / {PROJECTS.length}
                            </span>
                        </figcaption>
                    </figure>

                    <button
                        type="button"
                        className="gal-lb-nav is-next"
                        onClick={(e) => { e.stopPropagation(); step(1); }}
                        aria-label="Next project"
                    >
                        <ChevronRight size={26} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
