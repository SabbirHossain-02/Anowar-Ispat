import React, { useRef, useEffect, useState } from 'react'
import { onLive } from '../lib/live'

// অ্যাডমিন থেকে কোনো স্লাইড যোগ না করা থাকলে বা API না পেলে এগুলো দেখানো হয়
const defaultSlides = [
    {
        media: "",
        type: "video",
        poster: "",
        prefix: "SHAPING THE",
        accent: "FUTURE",
        subtitle: "Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure."
    },
    {
        media: "",
        type: "video",
        poster: "",
        prefix: "FORGED IN",
        accent: "FIRE",
        subtitle: "A cinematic journey of power, precision, and the steel that builds nations."
    },
    {
        media: "",
        type: "video",
        poster: "",
        prefix: "ENGINEERED FOR",
        accent: "ENDURANCE",
        subtitle: "Leading the industry with cutting-edge technology and engineering excellence."
    },
    {
        media: "",
        type: "video",
        poster: "",
        prefix: "SUSTAINABLE",
        accent: "PROGRESS",
        subtitle: "Committed to eco-friendly practices that power a greener tomorrow."
    },
];

const VideoHero = () => {
    const contentRef = useRef(null);
    const [slides, setSlides] = useState(defaultSlides);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visibleVideos, setVisibleVideos] = useState([0]);

    // ── API: অ্যাডমিন থেকে আপলোড করা হিরো ব্যানার ──────────────────────────
    useEffect(() => {
        let cancelled = false;
        const load = () => fetch('/api/hero', { cache: 'no-store' })
            .then((r) => r.json())
            .then((data) => {
                if (cancelled || !Array.isArray(data)) return;
                // সব স্লাইড মুছে দিলে কোডের স্লাইডগুলো ফেরে, ফাঁকা থাকে না
                setSlides(data.length === 0 ? defaultSlides : data.map((h) => ({
                    media: h.media_url,
                    type: h.media_type,
                    poster: h.poster_url || undefined,
                    prefix: h.title_prefix || '',
                    accent: h.title_accent || '',
                    subtitle: h.subtitle || ''
                })));
                setCurrentSlide(0);
                setVisibleVideos([0]);
            })
            .catch(() => {});
        load();
        // প্যানেলে স্লাইড যোগ, বদল বা মোছা হলে রিফ্রেশ ছাড়াই নতুনটা
        const off = onLive('hero', load);
        return () => { cancelled = true; off(); };
    }, []);
    // ─────────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (slides.length < 2) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // চলতি ও ঠিক পরের স্লাইডটুকুই লোড রাখি — সব ভিডিও একসাথে নামানো ঠেকাতে
    useEffect(() => {
        if (slides.length === 0) return;
        setVisibleVideos((prev) => {
            const next = (currentSlide + 1) % slides.length;
            return [...new Set([...prev, currentSlide, next])].slice(-3);
        });
    }, [currentSlide, slides.length]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!contentRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (isTouchDevice || innerWidth < 768) return;

            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            const rotateX = yPos * -15;
            const rotateY = xPos * 15;

            contentRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (!contentRef.current) return;
            contentRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        const t = setTimeout(() => setIsLoaded(true), 100);

        return () => {
            clearTimeout(t);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="video-hero" style={{ position: 'relative', overflow: 'hidden' }}>
            {slides.map((slide, index) => {
                const isVisible = visibleVideos.includes(index);
                return (
                    <div
                        key={slide.media || index}
                        className="video-background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: currentSlide === index ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            zIndex: currentSlide === index ? 1 : 0,
                            pointerEvents: 'none'
                        }}
                    >
                        {slide.type === 'image' ? (
                            <img
                                className="background-video"
                                src={isVisible ? slide.media : undefined}
                                alt=""
                                loading={index === 0 ? 'eager' : 'lazy'}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    opacity: isLoaded ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            />
                        ) : (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload={isVisible ? 'auto' : 'none'}
                                className="background-video"
                                src={isVisible ? slide.media : undefined}
                                poster={slide.poster}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    opacity: isLoaded ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            >
                            </video>
                        )}
                        <div className="video-overlay" style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                        }}></div>
                    </div>
                );
            })}

            {/* The 3D container that handles the perspective and rotation */}
            <div
                ref={contentRef}
                className="video-hero-content"
                style={{
                    transition: 'transform 0.1s ease-out', // Smooth out the mouse following
                    transformStyle: 'preserve-3d', // Ensure children can be popped out in 3D
                    zIndex: 10,
                    position: 'relative'
                }}
            >
                <img
                    src="/logo-badge.jpeg"
                    alt="Anwar Ispat Logo"
                    width="300"
                    height="80"
                    style={{
                        marginBottom: 'clamp(0.5rem, 3vh, 2rem)',
                        height: 'clamp(40px, min(8vw, 12vh), 100px)',
                        width: 'auto',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        filter: 'drop-shadow(0 0 45px rgba(227, 24, 45, 1))',
                        transform: 'translateZ(60px)',
                        transition: 'transform 0.3s ease'
                    }}
                />

                <div style={{ position: 'relative', width: '100%' }}>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.media || index}
                            style={{
                                position: index === 0 ? 'relative' : 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                opacity: currentSlide === index ? 1 : 0,
                                transition: 'opacity 0.8s ease-in-out',
                                pointerEvents: currentSlide === index ? 'auto' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {/* শিরোনাম ফাঁকা রাখলে ফাঁকা জায়গাও থাকে না — শুধু লোগো ও ভিডিও */}
                            {(slide.prefix || slide.accent) && (
                            <h1 className="video-hero-title" style={{ transform: 'translateZ(40px)', textAlign: 'center' }}>
                                {slide.prefix} <span className="accent-text">{slide.accent}</span>
                            </h1>
                            )}
                            {slide.subtitle && (
                            <p className="video-hero-subtitle" style={{
                                marginTop: 'clamp(0.5rem, 2vh, 1.5rem)',
                                maxWidth: 'min(600px, 90vw)',
                                padding: '0 1rem',
                                color: 'var(--subtext)',
                                fontSize: 'clamp(0.8rem, min(3vw, 4vh), 1.2rem)',
                                transform: 'translateZ(20px)', // Lowest pop out
                                textAlign: 'center',
                                marginInline: 'auto'
                            }}>
                                {slide.subtitle}
                            </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel Indicators */}
            {slides.length > 1 && (
                <div className="carousel-indicators" style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '12px',
                    zIndex: 20
                }}>
                    {slides.map((slide, index) => (
                        <button
                            key={slide.media || index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: currentSlide === index ? '32px' : '12px',
                                height: '12px',
                                borderRadius: '6px',
                                backgroundColor: currentSlide === index ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                padding: 0
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default VideoHero
