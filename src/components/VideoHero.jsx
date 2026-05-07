import React, { useRef, useEffect, useState, useCallback } from 'react'

const slides = [
    {
        video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776601119/Hero_Slide_1_akmt2o.mp4",
        poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776601119/Hero_Slide_1_akmt2o.jpg",
        title: <>SHAPING THE <span className="accent-text">FUTURE</span></>,
        subtitle: "Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure."
    },
    {
        video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776602663/13820828_3840_2160_30Fps_pkmnv5.mp4",
        poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776602663/13820828_3840_2160_30Fps_pkmnv5.jpg",
        title: <>FORGED IN <span className="accent-text">FIRE</span></>,
        subtitle: "A cinematic journey of power, precision, and the steel that builds nations."
    },
    {
        video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776602664/5121751-Uhd_3840_2160_25Fps_dilffe.mp4",
        poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776602664/5121751-Uhd_3840_2160_25Fps_dilffe.jpg",
        title: <>ENGINEERED FOR <span className="accent-text">ENDURANCE</span></>,
        subtitle: "Leading the industry with cutting-edge technology and engineering excellence."
    },
    {
        video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776603016/6997856-Hd_1920_1080_25Fps_tyjyst.mp4",
        poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1776603016/6997856-Hd_1920_1080_25Fps_tyjyst.jpg",
        title: <>SUSTAINABLE <span className="accent-text">PROGRESS</span></>,
        subtitle: "Committed to eco-friendly practices that power a greener tomorrow."
    },
];

const VideoHero = () => {
    const contentRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [visibleVideos, setVisibleVideos] = useState([0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setVisibleVideos(prev => {
                const next = (prev + 1) % slides.length;
                return [...new Set([...prev, next])].slice(-2);
            });
        }, 8000);
        return () => clearInterval(interval);
    }, []);

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

        setTimeout(() => setIsLoaded(true), 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="video-hero" style={{ position: 'relative', overflow: 'hidden' }}>
            {slides.map((slide, index) => (
                <div
                    key={index}
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
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload={visibleVideos.includes(index) ? "auto" : "none"}
                        className="background-video"
                        src={slide.video}
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
                    <div className="video-overlay" style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                    }}></div>
                </div>
            ))}

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
                    src="/Logo.png"
                    alt="Anwar Ispat Logo"
                    width="300"
                    height="80"
                    style={{
                        marginBottom: 'clamp(0.5rem, 3vh, 2rem)',
                        height: 'clamp(40px, min(8vw, 12vh), 100px)',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 45px rgba(227, 24, 45, 1))',
                        transform: 'translateZ(60px)',
                        transition: 'transform 0.3s ease'
                    }}
                />

                <div style={{ position: 'relative', width: '100%' }}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
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
                            <h1 className="video-hero-title" style={{ transform: 'translateZ(40px)', textAlign: 'center' }}>
                                {slide.title}
                            </h1>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators" style={{
                position: 'absolute',
                bottom: '3rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '12px',
                zIndex: 20
            }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
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
        </section>
    )
}

export default VideoHero
