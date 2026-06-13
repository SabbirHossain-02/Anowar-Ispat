import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
    { title: "Padma Bridge", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390678/Padma_Bridge_fnueme.mp4", desc: "A monumental infrastructure achievement connecting the nation." },
    { title: "Rooppur Power Plant", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390681/Rooppur_en98hz.mp4", desc: "Bangladesh's first nuclear power plant, empowering the future." },
    { title: "Mayor Hanif Flyover", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394650/mayor_hanif_msgq9d.mp4", desc: "Revolutionizing urban transit and reducing city congestion." },
    { title: "Purbachal Express Highway", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394690/Purbachal_Express_Highway_compressed_gxuze8.mp4", desc: "A massive arterial highway facilitating rapid economic growth." },
    { title: "Airport 3rd Terminal", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395501/Airport_3rd_Terminal_brxz6w.mp4", desc: "State-of-the-art aviation hub elevating global connectivity." },
    { title: "Shahjalal Fertilizer Factory", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395915/Shahjalal_Fertiliser_Factory_gefg5s.mp4", desc: "A critical industrial mega-project ensuring agricultural self-reliance." },
    { title: "Hotel Intercontinental", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396432/Hotel_Intercontinental_k6assz.mp4", desc: "Iconic luxury and heritage built on unwavering structural strength." },
    { title: "City Center Dhaka", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396567/City_Center_Dhaka_jzcyar.mp4", desc: "The tallest skyscraper defining the modern skyline of the capital." }
];

const ProjectsPage = () => {
    const containerRef = useRef(null);
    
    useGSAP(() => {
        const sections = gsap.utils.toArray('.project-slide');
        
        sections.forEach((section, index) => {
            const videoContainer = section.querySelector('.video-container');
            const textContainer = section.querySelector('.text-container');
            const isEven = index % 2 === 0;

            // Presentation slide morphing effect
            gsap.set(videoContainer, { 
                opacity: 0,
                xPercent: isEven ? -50 : 50,
                scale: 0.8,
                rotationY: isEven ? -15 : 15
            });
            
            gsap.set(textContainer, {
                opacity: 0,
                xPercent: isEven ? 50 : -50,
                scale: 0.9
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1.5,
                }
            });

            tl.to(videoContainer, {
                opacity: 1,
                xPercent: 0,
                scale: 1,
                rotationY: 0,
                ease: "power3.out"
            }, 0)
            .to(textContainer, {
                opacity: 1,
                xPercent: 0,
                scale: 1,
                ease: "power3.out"
            }, 0);
            
            // 3D Parallax inner elements
            const video = section.querySelector('video');
            gsap.to(video, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ background: 'var(--primary)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>
            <div style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}>
                <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "1rem" }}>
                    FORGED IN MOTION
                </p>
                <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--text)", lineHeight: 1.1, textTransform: "uppercase", fontFamily: "var(--font-heading)" }}>
                    OUR <span className="accent-text">LEGACY</span>
                </h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh', paddingBottom: '10vh' }}>
                {projects.map((proj, idx) => (
                    <div key={idx} className="project-slide" style={{
                        display: 'flex',
                        flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5vw',
                        padding: '0 5vw',
                        minHeight: '70vh',
                        perspective: '1500px'
                    }}>
                        {/* Video Container */}
                        <div className="video-container" style={{
                            flex: 1,
                            position: 'relative',
                            aspectRatio: '16/9',
                            overflow: 'hidden',
                            borderRadius: '16px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            maxWidth: '60vw'
                        }}>
                            <video 
                                src={proj.video} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                style={{
                                    width: '100%',
                                    height: '130%', // extra height for parallax
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: '-15%',
                                    left: 0,
                                    filter: 'brightness(0.7) contrast(1.1)'
                                }}
                            />
                            {/* Overlay glow */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                                zIndex: 1
                            }}></div>
                        </div>

                        {/* Text Container */}
                        <div className="text-container" style={{
                            flex: 0.8,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            zIndex: 2,
                        }}>
                            <div style={{
                                width: '40px',
                                height: '3px',
                                background: 'var(--accent)',
                                marginBottom: '1.5rem'
                            }}></div>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                color: 'var(--text)',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: 1.1,
                                textTransform: 'uppercase'
                            }}>
                                {proj.title}
                            </h2>
                            <p style={{
                                color: 'var(--subtext)',
                                fontSize: '1.2rem',
                                lineHeight: 1.6,
                                maxWidth: '500px'
                            }}>
                                {proj.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                @media (max-width: 900px) {
                    .project-slide {
                        flex-direction: column !important;
                        gap: 2rem !important;
                        padding: 0 5% !important;
                    }
                    .video-container {
                        max-width: 100% !important;
                    }
                    .text-container {
                        padding: 1rem 0 !important;
                        align-items: flex-start !important;
                        text-align: left !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;

