import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight, X, History, Globe, Zap, Shield, Target, Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import ForgeThread3D from "./three/ForgeThread3D";
import CoreStrengths3D from "./three/CoreStrengths3D";
import { useContent } from "../lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Static export kept empty — real data comes from API inside ProductService
// হোমপেজের সব সেকশন একই পাতার অংশ, তাই একটিই DEFAULTS
const HOME_DEFAULTS = {
    // আগে ঠিক দুটি ব্লক ছিল (a আর b), তাই তৃতীয় কিছু যোগ করা যেত না।
    // এখন তালিকা — প্যানেল থেকে যত খুশি যোগ বা মুছে ফেলা যায়, স্ক্রলের
    // ক্রসফেড সংখ্যা অনুযায়ী নিজেই লম্বা হয়।
    about: {
        eyebrow: 'VISION & LEADERSHIP',
        blocks: [
            {
                title: 'BUILDING A LEGACY OF',
                accent: 'STEEL.',
                name: 'LATE ANWAR HOSSAIN',
                role: 'FOUNDER, ANWAR GROUP',
                img: '/founder.webp',
                quote: "Our foundation isn't just laid in concrete; it's forged in unwavering commitment and intense heat. We started with a vision to build the unbuildable.",
            },
            {
                title: 'ENGINEERING THE NEXT',
                accent: 'CENTURY.',
                name: 'MANWAR HOSSAIN',
                role: 'GROUP MANAGING DIRECTOR',
                img: '/md.webp',
                quote: "We don't just supply materials; we engineer the resilience required to propel Bangladesh into the forefront of monumental construction.",
            },
        ],
    },
    why: {
        eyebrow: 'THE FORGED PATH',
        title: 'WHY CHOOSE US?',
        items: [
    {
      title: "190+ YEARS OF LEGACY",
      desc: "Part of the prestigious Anwar Group, building trust in Bangladesh since 1834.",
    },
    {
      title: "EUROPEAN TECHNOLOGY",
      desc: "The only manufacturer in Bangladesh using patented TMT technology from Belgium for superior reinforcement.",
    },
    {
      title: "PIONEER IN INNOVATION",
      desc: "The trailblazer in the Bangladesh steel industry, being the first to introduce 60-Grade reinforcement bars to the country.",
    },
    {
      title: "EARTHQUAKE RESISTANT",
      desc: "Engineered with a high TS/YS ratio for maximum ductility, meeting strict BNBC and ACI safety codes.",
    },
    {
      title: "PRECISION QUALITY",
      desc: "Every batch is tested via Spectrometer (28-element analysis) to ensure 100% compliance with BSTI and ISO standards.",
    },
    {
      title: "NATION BUILDER",
      desc: "A proven partner for Bangladesh's iconic mega-projects and thousands of individual homes.",
    },
        ],
    },
    ps: {
        title: 'PRODUCT & SERVICE',
        intro: "Forged in extreme intensity. We provide exceptional structural solutions designed to act as the unyielding backbone of tomorrow's infrastructure.",
        learnBtn: 'Learn More',
        quoteBtn: 'REQUEST A QUOTE',
        specLabel: 'KEY SPECIFICATIONS',
        specs: [
            'Ultimate Tensile Strength: 500 MPa','Excellent Weldability and Bendability', 'Earthquake Resistant Properties', 'Advanced Rib Design for better bonding'],
        loading: 'Loading products...',
        empty: 'No products published yet.',
    },
    strengths: {
        heading: 'WHY CHOOSE',
        brand: 'ANWAR',
        brandAccent: 'ISPAT',
        tail: 'THE BEST?',
        items: ['SUPERIOR STRENGTH', 'EXCELLENT DUCTILITY', 'EASY WELDABILITY', 'IMPROVED RIB DESIGN', 'TMT TECHNOLOGY', 'PRECISE STANDARDS', 'CONTROLLED MICROSTRUCTURE'],
    },
    projects: { eyebrow: 'NATION BUILDERS', title: 'MEGA', accent: 'PROJECTS', items: [
        // ভিডিওগুলো Cloudinary তে ছিল, সেই অ্যাকাউন্ট বন্ধ হয়ে গেছে
        // ("cloud_name dswgpcl6a is disabled") — ফাইল ফেরানো যায়নি।
        // এখন প্যানেলের Home page থেকে ভিডিও ও স্থিরচিত্র আপলোড হয়,
        // দুটোই R2 তে যায়। ঘর খালি থাকলে কার্ডে কেবল নামটুকু থাকে।
        { title: "Padma Bridge", video: "", poster: "", desc: "The Padma Multipurpose Bridge is Bangladesh's largest infrastructure project, spanning 6.15 km over the Padma River. Anwar Ispat supplied high-grade TMT steel rods that form the structural backbone of this historic bridge, connecting 21 southern districts and transforming the lives of over 30 million people." },
        { title: "Rooppur Power Plant", video: "", poster: "", desc: "The Rooppur Nuclear Power Plant is Bangladesh's first-ever nuclear facility, built with a capacity of 2,400 MW. Anwar Ispat contributed precision-engineered steel materials to support the construction of this landmark project, which marks a new era of energy independence for the nation." },
        { title: "Mayor Hanif Flyover", video: "", poster: "", desc: "The Mayor Hanif Flyover is one of Dhaka's most critical elevated expressways, stretching over 11.8 km to ease severe traffic congestion. Anwar Ispat's reinforcement steel played a vital role in the construction of this flyover, improving daily commutes for millions of residents." },
        { title: "Purbachal Express Highway", video: "", poster: "", desc: "The Purbachal Express Highway is a modern 6-lane expressway connecting Dhaka to the Purbachal New Town development. Built with Anwar Ispat's high-strength steel, this highway is designed to support Bangladesh's expanding urban footprint and accelerate economic activity in the eastern corridor." },
        { title: "Airport 3rd Terminal", video: "", poster: "", desc: "The Hazrat Shahjalal International Airport's 3rd Terminal is a landmark aviation project designed to handle 12 million passengers annually. Anwar Ispat supplied structural steel that supports the terminal's expansive framework, helping Bangladesh step into a new era of international aviation." },
        { title: "Shahjalal Fertilizer Factory", video: "", poster: "", desc: "The Shahjalal Fertilizer Factory is one of Bangladesh's largest industrial projects, producing urea fertilizer to support the agricultural sector. Anwar Ispat provided heavy-duty steel for the factory's structural framework, contributing to the nation's food security and industrial growth." },
        { title: "Hotel Intercontinental", video: "", poster: "", desc: "Iconic luxury and heritage built on unwavering structural strength." },
        { title: "City Center Dhaka", video: "", poster: "", desc: "The tallest skyscraper defining the modern skyline of the capital." },
  ] },
    media: {
        title: 'NEWS DESK',
        heading: ['MEDIA &', 'EVENTS'],
        intro: 'Constant motion. Constant innovation. Tap into our live broadcasting feed to stay updated with structural advancements across the nation.',
        cta: 'ACCESS FULL TERMINAL',
        loading: 'Loading media posts...',
        empty: 'No media posts yet.',
    },
    blog: {
        cta: 'ACCESS FULL TERMINAL',
        eyebrow: '[ SYSTEM.ARCHIVES.OPEN ]',
        title: 'INSIGHTS & INNOVATIONS',
        items: [
    { category: "Engineering Analysis", title: "The Physics of 500W: Tension, Yield, and Structural Absolute", readTime: "06:00 MIN", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800" },
    { category: "Sustainable Future", title: "Achieving Net-Zero: Algorithms Controlling Carbon Outputs", readTime: "08:30 MIN", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" },
    { category: "Project Architectural", title: "Bridging the Divide: Logistics of Mega-Ton Deliveries", readTime: "04:45 MIN", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" },
  ],
    },
    footer: {
        tagline: "Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.",
        quickTitle: 'QUICK LINKS',
        legalTitle: 'LEGAL',
        contactBtn: 'CONTACT US',
        quick: ['Product & Service | #product-service', 'Better Tomorrow | #better-tomorrow', 'Career | #career', 'Media & Events | #media-events'],
        legal: ['Privacy Policy | #', 'Terms of Service | #'],
    },
};

// আইকন ও দিক JSON এ যায় না — কোডে থেকে ক্রম অনুযায়ী বসে
const MS_ICONS = [History, Globe, Zap, Shield, Target, Building2];
const msIcon = (i) => MS_ICONS[i % MS_ICONS.length];
const msAlign = (i) => (i % 2 === 0 ? 'left' : 'right');

export const products = [];

export const ProductService = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── API: load products from backend ──────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setProducts(
            data.map((p) => ({
              id: p.id,
              title: p.title,
              desc: p.description || "",
              img: p.image_url
                ? p.image_url
                : "/product_image.png",
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoadingProducts(false); });
    return () => { cancelled = true; };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900 || window.innerHeight < 500);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent('lenis-stop'));
    } else {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent('lenis-start'));
    }

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent('lenis-start'));
    };
  }, [selectedProduct]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section
      id="product-service"
      style={{
        minHeight: "auto",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0 5%",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          zIndex: 10,
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "auto 0",
        }}
      >
        <h2
          className="accent-text"
          style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
        >
          {home.ps.title}
        </h2>
        <p
          style={{
            color: "var(--subtext)",
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          {home.ps.intro}
        </p>

        {products.length === 0 ? (
          <div style={{ color: "var(--subtext)", marginTop: "4rem", fontSize: "1rem" }}>
            {loadingProducts ? home.ps.loading : home.ps.empty}
          </div>
        ) : (
          <div className="carousel-container">
            {products.map((product, index) => {
              let offset = index - activeIndex;
              if (offset < -1) offset += products.length;
              if (offset > 1) offset -= products.length;

              let style = {};
              if (isMobile) {
                if (offset === 0) {
                  style = { transform: "translateX(0) scale(1)", zIndex: 3, opacity: 1 };
                } else if (offset === 1) {
                  style = { transform: "translateX(95%) scale(0.9)", zIndex: 2, opacity: 0.5 };
                } else if (offset === -1) {
                  style = { transform: "translateX(-95%) scale(0.9)", zIndex: 2, opacity: 0.5 };
                } else {
                  style = { transform: "translateX(0) scale(0.5)", zIndex: 1, opacity: 0 };
                }
              } else {
                if (offset === 0) {
                  style = {
                    transform: "translateX(0) scale(1) translateZ(50px)",
                    zIndex: 3,
                    opacity: 1,
                  };
                } else if (offset === 1) {
                  style = {
                    transform:
                      "translateX(110%) scale(0.75) translateZ(-50px) rotateY(-20deg)",
                    zIndex: 2,
                    opacity: 0.6,
                  };
                } else if (offset === -1) {
                  style = {
                    transform:
                      "translateX(-110%) scale(0.75) translateZ(-50px) rotateY(20deg)",
                    zIndex: 2,
                    opacity: 0.6,
                  };
                } else {
                  style = {
                    transform: "translateX(0) scale(0.5) translateZ(-150px)",
                    zIndex: 1,
                    opacity: 0,
                  };
                }
              }

              return (
                <div
                  key={product.id}
                  className={`carousel-card ${offset === 0 ? 'active' : ''}`}
                  style={style}
                  onClick={() => {
                    if (offset === 0) {
                      setSelectedProduct(product);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    width="380"
                    height="250"
                    className="carousel-img"
                  />
                  <div className="carousel-content">
                    <h3 className="carousel-title">{product.title}</h3>
                    <p className="carousel-desc">{product.desc}</p>

                    <div className="carousel-actions">
                      <button
                        className="btn-learn-more"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                      >
                        {home.ps.learnBtn}
                      </button>
                      <button
                        className="btn-get-quote"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent('open-quote'));
                        }}
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="carousel-nav">
              <button className="carousel-btn" onClick={prevSlide}>
                <ChevronLeft size={24} />
              </button>
              <button className="carousel-btn" onClick={nextSlide}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`product-modal-overlay ${selectedProduct ? "open" : ""}`}
        onClick={() => setSelectedProduct(null)}
      >
        <div
          className="product-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="product-modal-img-container">
            <img
              src={selectedProduct?.img || "/product_image.png"}
              alt={selectedProduct?.title || "Product"}
              width="450"
              height="300"
              className="product-modal-img"
            />
          </div>
          <div className="product-modal-content">
            <button
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={28} />
            </button>
            <h3 className="product-modal-title">{selectedProduct?.title}</h3>
            <p className="product-modal-desc">{selectedProduct?.desc}</p>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "var(--accent)", marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>{home.ps.specLabel}</h4>
              <ul className="product-spec-list">
                {home.ps.specs.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>

            <div className="product-modal-actions">
              <button
                className="btn-get-quote"
                style={{ width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "700" }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-quote'));
                }}
              >
                {home.ps.quoteBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutUs = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const blocks = Array.isArray(home.about.blocks) ? home.about.blocks : [];
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const imgRefs = useRef([]);

  useGSAP(
    () => {
      const n = blocks.length;
      if (n < 2) return;

      // প্রতিটি বদলের জন্য দুই পর্দা স্ক্রল — দুটি ব্লকে আগের মতোই ২০০%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + (n - 1) * 200 + "%",
          pin: true,
          scrub: 1,
        },
      });

      for (let i = 0; i < n - 1; i += 1) {
        const outImg = imgRefs.current[i];
        const outText = textRefs.current[i];
        const inImg = imgRefs.current[i + 1];
        const inText = textRefs.current[i + 1];
        if (!outImg || !outText || !inImg || !inText) continue;

        tl.to(outImg, { yPercent: -20, opacity: 0, scale: 0.9, duration: 1 }, i);
        tl.to(outText, { opacity: 0, y: -50, duration: 1 }, i);
        tl.fromTo(
          inImg,
          { yPercent: 50, opacity: 0, scale: 1.1 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 1 },
          i + 0.5,
        );
        tl.fromTo(
          inText,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          i + 0.5,
        );
      }
    },
    // অ্যাডমিন ব্লক যোগ বা বাদ দিলে টাইমলাইন নতুন করে বাঁধতে হয়
    { scope: sectionRef, dependencies: [blocks.length], revertOnUpdate: true },
  );

  return (
    <section
      id="about-us"
      ref={sectionRef}
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "var(--primary)",
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          position: "relative",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 10%",
            position: "relative",
            height: "100%",
            zIndex: 10,
          }}
        >
          {/* মোবাইলের CSS এই <p> টিকে বাঁ কলামের প্রথম সন্তান ধরে */}
          <p
            style={{
              fontFamily: "monospace",
              color: "var(--accent)",
              letterSpacing: "0.2em",
              marginBottom: "2rem",
              fontSize: "1rem",
              zIndex: 20,
              position: "absolute",
              top: "15%",
            }}
          >
            {home.about.eyebrow}
          </p>

          <div style={{ position: "relative", width: "100%", height: "300px" }}>
            {blocks.map((b, i) => (
              <div
                key={i}
                ref={(el) => { textRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    color: "var(--text)",
                    lineHeight: 1.1,
                    marginBottom: "1.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  {b.title}{" "}
                  <span className="accent-text">{b.accent}</span>
                </h2>
                <p
                  style={{
                    color: "var(--subtext)",
                    fontSize: "1.2rem",
                    lineHeight: 1.6,
                    maxWidth: "500px",
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  {b.quote}
                </p>
                <h4
                  style={{
                    marginTop: "2rem",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "0.1em",
                    color: "var(--text)",
                  }}
                >
                  {b.name}
                </h4>
                <p
                  style={{
                    fontFamily: "monospace",
                    color: "var(--subtext)",
                    fontSize: "0.8rem",
                  }}
                >
                  {b.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ position: "relative", height: "100%", overflow: "hidden" }}
        >
          <div
            className="about-us-shadow-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(to right, var(--primary) 0%, transparent 100%)",
              zIndex: 5,
              pointerEvents: "none",
            }}
          ></div>

          {blocks.map((b, i) => (
            <img
              key={i}
              ref={(el) => { imgRefs.current[i] = el; }}
              className={i === 0 ? "founder-img" : "md-img"}
              src={b.img || undefined}
              alt={b.name || ""}
              width="800"
              height="600"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                filter: "grayscale(100%) contrast(1.2)",
                opacity: i === 0 ? 1 : 0,
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(227, 24, 45, 0.2), transparent 70%)",
              zIndex: 4,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          #about-us {
            height: auto !important;
            min-height: 100vh !important;
          }
          #about-us > div {
            display: flex !important;
            flex-direction: column-reverse !important;
          }
          #about-us > div > div:first-child {
            height: auto !important;
            padding: 4rem 5% !important;
            justify-content: flex-start !important;
          }
          #about-us > div > div:first-child > p {
            position: relative !important;
            top: auto !important;
            margin-bottom: 2rem !important;
          }
          #about-us > div > div:last-child {
            position: relative !important;
            width: 100% !important;
            height: 50vh !important;
          }
          .about-us-shadow-overlay {
            background: linear-gradient(
              to bottom,
              transparent 0%,
              transparent 80%,
              var(--primary) 100%
            ) !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

const MilestoneCard = ({ index, title, desc, icon: Icon, align, isVisible }) => {
  const isLeft = align === 'left';
  const translateX = isVisible ? '0' : (isLeft ? '-50px' : '50px');
  const opacity = isVisible ? 1 : 0;
  const filter = isVisible ? 'blur(0)' : 'blur(10px)';

  return (
    <div className="milestone-card" data-index={index} style={{
      display: 'flex',
      flexDirection: isLeft ? 'row' : 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '50vh',
      position: 'relative',
      zIndex: 2,
      gap: '4rem',
    }}>
      <div style={{
        flex: 1,
        textAlign: isLeft ? 'right' : 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-end' : 'flex-start',
        opacity: opacity,
        transform: `translateX(${isLeft ? '-100px' : '100px'}) translateY(${isVisible ? '0' : '20px'}) translateX(${isVisible ? (isLeft ? '100px' : '-100px') : '0'})`,
        filter: filter,
        transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1)'
      }}>
        <h3 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,1)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--subtext)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '400px' }}>
          {desc}
        </p>
      </div>

      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--bg-section)',
        border: `3px solid ${isVisible ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        transition: 'border-color 0.5s ease',
        boxShadow: isVisible ? '0 0 20px rgba(227, 24, 45, 0.5)' : 'none'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isVisible ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
          transition: 'background-color 0.5s ease'
        }} />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        opacity: opacity,
        transform: `translateX(${isLeft ? '100px' : '-100px'}) translateY(${isVisible ? '0' : '20px'}) translateX(${isVisible ? (isLeft ? '-100px' : '100px') : '0'})`,
        filter: filter,
        transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.1s'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '4/3',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--milestone-img-overlay, linear-gradient(to top, rgba(11,11,11,0.8), transparent))', zIndex: 0 }} />
          {Icon && (
            <Icon
              size={140}
              strokeWidth={1}
              color="var(--accent)"
              style={{
                zIndex: 1,
                transform: `scale(${isVisible ? 1 : 0.8})`,
                transition: 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
                opacity: isVisible ? 1 : 0.2,
                filter: isVisible ? 'drop-shadow(0 0 25px rgba(227, 24, 45, 0.5))' : 'none'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const WhyChooseUs = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleMilestones, setVisibleMilestones] = useState([]);

  const milestones = home.why.items;
;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startReveal = viewportHeight * 0.8;

      let progress = 0;
      if (rect.top <= startReveal) {
        progress = Math.min(100, Math.max(0, ((startReveal - rect.top) / (rect.height)) * 100));
      }
      setScrollProgress(progress);

      const newVisible = [];
      const cards = sectionRef.current.querySelectorAll('.milestone-card');
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top + (cardRect.height / 2) <= startReveal + 100) {
          newVisible.push(index);
        }
      });

      setVisibleMilestones(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="why-choose-us" ref={sectionRef} style={{
      minHeight: 'auto',
      background: 'var(--bg-section, rgba(11, 11, 11, 0.7))',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255, 60, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 60, 0, 0.1)',
      position: 'relative',
      zIndex: 10,
      padding: '30px 5%',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'var(--career-glow, radial-gradient(circle, rgba(227, 24, 45, 0.05) 0%, transparent 60%))',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="central-thread-container" style={{
        position: 'absolute',
        top: '15rem',
        bottom: '10rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        zIndex: 3,
        pointerEvents: 'none'
      }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "low-power" }}
        >
          <ForgeThread3D scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '8rem', position: 'relative', zIndex: 10 }}>
        <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {home.why.eyebrow}
        </p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', color: 'var(--text)', lineHeight: 1, textTransform: 'uppercase' }}>
          {home.why.title}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {milestones.map((milestone, idx) => (
          <MilestoneCard
            key={idx}
            index={idx}
            {...milestone}
            isVisible={visibleMilestones.includes(idx)}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                @media (max-width: 900px) {
                    .central-thread-container {
                        left: calc(5% + 20px) !important;
                        transform: translateX(-50%) !important;
                    }
                    .milestone-card {
                        flex-direction: column !important;
                        gap: 2rem !important;
                        align-items: flex-start !important;
                        padding-left: 50px !important;
                    }
                    .milestone-card > div:first-child {
                        text-align: left !important;
                        align-items: flex-start !important;
                    }
                    .milestone-card > div:nth-child(2) {
                        position: absolute !important;
                        left: 20px !important;
                        transform: translateX(-50%) !important;
                    }
                    .milestone-card > div:last-child {
                        justify-content: flex-start !important;
                        width: 100% !important;
                    }
                }
            `}} />
    </section>
  );
};

const BroadcastCard = ({ date, title, desc, img, isHovering, onHover }) => {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        display: "flex",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderLeft: "4px solid rgba(255, 255, 255, 0.1)",
        padding: "clamp(1rem, 3vw, 1.5rem)",
        minWidth: "min(400px, 100%)",
        height: "clamp(120px, 15vh, 140px)",
        width: "100%",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
        transform: "translateZ(0)",
        willChange: "transform, border-color, box-shadow",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05) translateZ(20px)";
        e.currentTarget.style.borderLeftColor = "var(--accent)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.boxShadow =
          "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(227, 24, 45, 0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1) translateZ(0)";
        e.currentTarget.style.borderLeftColor = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          flex: "0 0 clamp(70px, 20vw, 100px)",
          height: "100%",
          marginRight: "clamp(0.8rem, 3vw, 1.5rem)",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        <img
          src={img}
          alt={title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.8)",
            transition: "filter 0.4s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.filter = "grayscale(0)")}
          onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(0.8)")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          minWidth: 0,
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--accent)",
            marginBottom: "0.5rem",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              background: "var(--accent)",
              borderRadius: "50%",
              marginRight: "5px",
              animation: "blink 2s infinite",
            }}
          ></span>{" "}
          {date}
        </p>
        <h4
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem",
            marginBottom: "0.5rem",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--subtext)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {desc}
        </p>
      </div>

      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const ProjectShowcase = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const projects = home.projects.items;


  const ProjectCard = ({ proj, idx }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (isHovered && videoRef.current && !isLoaded) {
        videoRef.current.load();
        setIsLoaded(true);
      }
    }, [isHovered]);

    return (
      <div 
        className="project-card" 
        style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', aspectRatio: '16/9', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.05)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

        onClick={() => setSelectedProject(proj)}
      >
        <video
          ref={videoRef}
          preload="none"
          loop
          muted
          playsInline
          className="project-video"
          poster={proj.poster || undefined}
          src={isLoaded && proj.video ? proj.video : undefined}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(80%) brightness(0.6)', transition: 'all 0.5s ease' }}
        />
        <div className="project-overlay" style={{ position: 'absolute', inset: 0, background: isHovered ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(227,24,45,0.2) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', transition: 'all 0.3s ease' }}>
          <h3 style={{ color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,1)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', textTransform: 'uppercase', transform: isHovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.4s ease' }} className="project-title">{proj.title}</h3>
          <p style={{ color: 'var(--subtext)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.4s ease 0.1s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} className="project-desc">{proj.desc}</p>
        </div>
        <div className="project-glow" style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent)', borderRadius: '12px', opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
      </div>
    );
  };

  return (
    <section
      id="project-showcase"
      style={{
        minHeight: "auto",
        background: "var(--bg-section, rgba(11, 11, 11, 0.7))",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255, 60, 0, 0.1)",
        padding: "30px 5%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {home.projects.eyebrow}
        </p>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--text)", lineHeight: 1.1, textTransform: "uppercase", fontFamily: "var(--font-heading)" }}>
          {home.projects.title} <span className="accent-text">{home.projects.accent}</span>
        </h2>
      </div>

      <div
        className="project-grid"
        style={{ display: "grid", gap: "1.5rem", width: "100%", maxWidth: "1400px", margin: "0 auto" }}
      >
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} proj={proj} idx={idx} />
        ))}
      </div>

      <style jsx>{`
        .project-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1200px) { .project-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) { .project-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) {
          .project-grid { grid-template-columns: 1fr !important; }
          .project-card .project-video { filter: grayscale(0%) brightness(0.8) !important; }
          .project-card .project-desc { opacity: 1 !important; transform: translateY(0) !important; }
          .project-card .project-title { transform: translateY(0) !important; color: #fff !important; text-shadow: 0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7) !important; }
        }
      `}</style>
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--primary)', border: '1px solid rgba(227,24,45,0.3)', borderRadius: '16px', display: 'flex', maxWidth: '900px', width: '100%', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.8)', position: 'relative', maxHeight: '90vh' }}>
            <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'var(--text)', cursor: 'pointer', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>X</button>
            <div style={{ flex: 1, minHeight: '300px', position: 'relative', overflow: 'hidden' }}>
              <video src={selectedProject.video || undefined} poster={selectedProject.poster || undefined} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, var(--primary) 100%)' }} />
            </div>
            <div style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'white!important', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1rem' }}>{selectedProject.title}</h3>
              <p style={{ color: 'var(--subtext)', fontSize: '1.2rem', lineHeight: 1.9, marginTop: '0.75rem' }}>{selectedProject.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const MediaEvents = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const [isHovered, setIsHovered] = useState(false);

  // ── API: load media posts from backend ───────────────────────────────────
  const [broadcastData, setBroadcastData] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(true);

  // মার্কি কনটেইনার ৬০vh স্থির উচ্চতার। পোস্ট কম থাকলে কার্ডগুলো
  // সেটুকু ভরাতে পারে না, ফলে নিচে বড় ফাঁকা জায়গা পড়ে থাকে এবং
  // স্ক্রল করার সাথে সেটা আরও বাড়ে। তাই কম হলে স্ক্রল বন্ধ রেখে
  // উচ্চতা কনটেন্ট অনুযায়ী ছেড়ে দিই।
  const canScroll = broadcastData.length >= 4;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setBroadcastData(
          data.map((m) => ({
            date: m.event_date
              ? String(m.event_date).toUpperCase() + " - " + (m.category || "LOCAL")
              : (m.category || "LOCAL"),
            title: m.title,
            desc: m.description || "",
            img: m.image_url
              ? m.image_url
              : "https://images.unsplash.com/photo-1541888053158-b6fe071d3714?auto=format&fit=crop&q=80&w=600",
          }))
        );
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoadingMedia(false); });
    return () => { cancelled = true; };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      id="media-events"
      style={{
        minHeight: "auto",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg-section, rgba(11, 11, 11, 0.7))",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        padding: "30px 5%",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: "10%", width: "1px", height: "100%", background: "rgba(255,255,255,0.05)" }}></div>
      <div style={{ position: "absolute", top: 0, right: "10%", width: "1px", height: "100%", background: "rgba(255,255,255,0.05)" }}></div>

      <div
        className="media-events-container"
        style={{ maxWidth: "1400px", width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center", height: "100%" }}
      >
        <div className="media-text-content" style={{ flex: "1 1 400px", minWidth: "350px", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--accent)", borderRadius: "50%", animation: "blink 2s infinite" }}></span>
            <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", fontSize: "0.9rem", margin: 0 }}>{home.media.title}</p>
          </div>
          <h2 className="accent-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", lineHeight: "0.9" }}>
            {(home.media.heading || []).map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h2>
          <p style={{ color: "var(--subtext)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            {home.media.intro}
          </p>
          <a href="#all-events" className="magnetic-btn" style={{ fontSize: "0.85rem", padding: "1rem 2rem", marginTop: 0, background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>
            {home.media.cta}
          </a>
        </div>

        <div
          className="marquee-container"
          style={{ flex: "1 1 500px", minWidth: "400px", height: canScroll ? "clamp(400px, 60vh, 80vh)" : "auto", position: "relative", perspective: "1000px", display: "flex", alignItems: "center" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "150px", zIndex: 5, pointerEvents: "none" }}></div>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "150px", zIndex: 5, pointerEvents: "none" }}></div>

          {broadcastData.length === 0 ? (
            <div style={{ color: "var(--subtext)", textAlign: "center", width: "100%", fontSize: "0.9rem" }}>
              {loadingMedia ? home.media.loading : home.media.empty}
            </div>
          ) : (
            <div
              className="broadcast-marquee"
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem", transformStyle: "preserve-3d", animation: (canScroll && !isHovered) ? "scrollUp 25s linear infinite" : "none", animationPlayState: isHovered ? "paused" : "running", transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              {/* তিন কপি — scrollUp ঠিক এক কপি (-33.33%) সরায়, তাই লুপ নিরবচ্ছিন্ন হয়।
                  পোস্ট কম থাকলে কপি করা হয় না, নইলে একই খবর বারবার দেখা যেত। */}
              {(canScroll
                ? [...broadcastData, ...broadcastData, ...broadcastData]
                : broadcastData
              ).map((event, index) => (
                <BroadcastCard key={index} {...event} onHover={setIsHovered} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% { transform: rotateY(-15deg) rotateX(5deg) translateY(0); }
          100% { transform: rotateY(-15deg) rotateX(5deg) translateY(-33.33%); }
        }
        @keyframes scrollUpMobile {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        @media (max-width: 900px) {
          #media-events { padding: 30px 5% !important; height: auto !important; }
          .media-events-container { height: auto !important; flex-direction: column !important; gap: 2rem !important; }
          .media-text-content { margin-bottom: 2rem; }
          .marquee-container { perspective: none !important; height: 60vh !important; width: 100% !important; }
          .broadcast-marquee { transform: none !important; animation: scrollUpMobile 20s linear infinite !important; }
        }
      `}</style>
    </section>
  );
};

const InsightCarouselCard = ({ category, title, readTime, img, index, currentIndex, cta }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = index === currentIndex;
  const isPrev = index === (currentIndex - 1 + 3) % 3;
  const isNext = index === (currentIndex + 1) % 3;

  let transform = "translateX(0) translateZ(0) rotateY(0deg) scale(0.8)";
  let opacity = 0;
  let zIndex = 1;
  let filter = "grayscale(100%) blur(5px)";

  if (isActive) {
    transform = isMobile ? "translateX(0) scale(1)" : "translateX(0) translateZ(50px) rotateY(0deg) scale(1)";
    opacity = 1; zIndex = 10; filter = "grayscale(0%) blur(0px)";
  } else if (isPrev) {
    transform = isMobile ? "translateX(-95%) scale(0.9)" : "translateX(-60%) translateZ(-100px) rotateY(25deg) scale(0.85)";
    opacity = 0.5; zIndex = 5;
  } else if (isNext) {
    transform = isMobile ? "translateX(95%) scale(0.9)" : "translateX(60%) translateZ(-100px) rotateY(-25deg) scale(0.85)";
    opacity = 0.5; zIndex = 5;
  }

  return (
    <div style={{ position: "absolute", top: "10%", left: 0, right: 0, margin: "0 auto", width: "clamp(280px, min(90vw, 90vh), 600px)", height: "clamp(220px, min(50vw, 50vh), 380px)", background: `linear-gradient(var(--insight-overlay-1, rgba(11, 11, 11, 0.4)), var(--insight-overlay-2, rgba(11, 11, 11, 0.95))), url(${img}) center/cover`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: isActive ? "1px solid rgba(227, 24, 45, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", padding: "clamp(1rem, min(4vw, 4vh), 3rem)", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)", transform, opacity, zIndex, filter, boxShadow: isActive ? "0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(227, 24, 45, 0.2)" : "0 10px 30px rgba(0,0,0,0.5)", transformStyle: "preserve-3d", pointerEvents: isActive ? "all" : "none" }}>
      <div style={{ transform: "translateZ(30px)", transition: "transform 0.8s ease" }}>
        <span style={{ display: "inline-block", fontFamily: "monospace", fontSize: "clamp(0.6rem, 2vmin, 0.8rem)", color: isActive ? "var(--accent)" : "rgba(255,255,255,0.5)", letterSpacing: "0.2em", marginBottom: "clamp(0.5rem, 2vh, 1rem)", textTransform: "uppercase", transition: "all 0.5s ease" }}>// {category}</span>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 5vmin, 2.2rem)", marginBottom: "clamp(0.5rem, 2vh, 1.5rem)", color: "#fff", lineHeight: "1.2", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>{title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s ease 0.2s", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "clamp(0.8rem, 2vh, 1.5rem)" }}>
          <span style={{ fontFamily: "monospace", color: "var(--subtext)", fontSize: "clamp(0.7rem, 2vmin, 0.85rem)" }}>TIME: {readTime}</span>
          <a href="#read" className="magnetic-btn" style={{ margin: 0, padding: "clamp(0.5rem, 1.5vh, 0.8rem) clamp(1rem, 3vmin, 1.5rem)", fontSize: "clamp(0.6rem, 2vmin, 0.8rem)", borderRadius: "4px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>{cta}</a>
        </div>
      </div>
      {isActive && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(227, 24, 45, 0.1), transparent 60%)", pointerEvents: "none", borderRadius: "16px" }}></div>}
    </div>
  );
};

export const Blog = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const insights = home.blog.items;


  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % insights.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);

  return (
    <section id="blog" style={{ minHeight: "auto", justifyContent: "center", alignItems: "center", background: "var(--bg-section, rgba(11, 11, 11, 0.7))", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", position: "relative", zIndex: 10, padding: "30px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto clamp(2rem, 5vh, 4rem) auto", position: "relative", zIndex: 20, padding: "0 5%" }}>
        <p style={{ fontFamily: "monospace", color: "var(--subtext)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "0.9rem" }}>{home.blog.eyebrow}</p>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", lineHeight: "1.1", textTransform: "uppercase", marginBottom: "1.5rem" }}>{home.blog.title}</h2>
      </div>

      <div style={{ position: "relative", height: "clamp(300px, min(60vw, 60vh), 480px)", width: "100%", perspective: "1500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {insights.map((insight, idx) => (
          <InsightCarouselCard key={idx} index={idx} currentIndex={currentIndex} cta={home.blog.cta} {...insight} />
        ))}
        <div style={{ position: "absolute", bottom: "0", display: "flex", gap: "2rem", zIndex: 30 }}>
          <button onClick={handlePrev} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>&larr;</button>
          <button onClick={handleNext} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>&rarr;</button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "20vh", background: "var(--vignette-bottom, linear-gradient(to top, rgba(11,11,11,0.95), transparent))", pointerEvents: "none", zIndex: 11 }}></div>
    </section>
  );
};

export const Footer = ({ onOpenContact }) => {
  const home = useContent('home', HOME_DEFAULTS);
  return (
  <footer style={{ width: "100%", padding: "4rem 10% 2rem 10%", backgroundColor: "var(--primary)", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 10 }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", marginBottom: "4rem" }}>
      <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <img src="/logo-badge.jpeg" alt="Anwar Ispat Logo" width="200" height="60" style={{ height: "clamp(50px, 8vw, 80px)", width: "auto", objectFit: "contain", objectPosition: "left", marginBottom: "1.5rem", borderRadius: "6px" }} />
        <p style={{ color: "var(--subtext)", fontSize: "0.9rem", lineHeight: "1.6", maxWidth: "300px" }}>
          {home.footer.tagline}
        </p>
        <button onClick={onOpenContact} className="magnetic-btn" style={{ fontSize: "0.8rem", padding: "0.8rem 1.5rem" }}>{home.footer.contactBtn}</button>
      </div>
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{home.footer.quickTitle}</h4>
          {home.footer.quick.map((line) => { const at = line.indexOf('|'); const label = at < 0 ? line.trim() : line.slice(0, at).trim(); const href = at < 0 ? '#' : line.slice(at + 1).trim(); return (
            <a key={href} href={href} style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>{label}</a>
          ); })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{home.footer.legalTitle}</h4>
          {home.footer.legal.map((line) => { const at = line.indexOf("|"); const label = at < 0 ? line.trim() : line.slice(0, at).trim(); const href = at < 0 ? "#" : line.slice(at + 1).trim(); return (
            <a key={label} href={href} style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.9rem" }}>{label}</a>
          ); })}
        </div>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <p style={{ color: "var(--subtext)", fontSize: "0.8rem" }}>&copy; {new Date().getFullYear()} Anwar Ispat. All Rights Reserved.</p>
      {/* কপিরাইট ও সোশ্যাল লিংকের ঠিক মাঝে — space-between এ তিনটি
          সন্তান থাকলে মাঝেরটি নিজে থেকেই কেন্দ্রে বসে */}
      <p style={{ color: "var(--subtext)", fontSize: "0.8rem" }}>
        Developed by{" "}
        <a
          href="https://pkgit.net"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
        >
          pkgit.net
        </a>
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Facebook","LinkedIn","Twitter"].map(s=><a key={s} href="#" style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.8rem" }}>{s}</a>)}
      </div>
    </div>
  </footer>
  );
};

export const CoreStrengths = () => {
  const home = useContent('home', HOME_DEFAULTS);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', position: 'relative', background: 'var(--bg-section, rgba(11, 11, 11, 0.7))', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255, 60, 0, 0.1)', borderBottom: '1px solid rgba(255, 60, 0, 0.1)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 5%' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(227, 24, 45, 0.03) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to bottom, var(--primary) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, var(--primary) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3 }}>
        <Canvas camera={{ position: [0, 4, 16], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: "low-power" }}>
          <CoreStrengths3D inView={inView} text={home.strengths} />
        </Canvas>
      </div>
    </section>
  );
};





