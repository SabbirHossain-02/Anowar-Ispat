import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight, X, History, Globe, Zap, Shield, Target, Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import ForgeThread3D from "./three/ForgeThread3D";
import CoreStrengths3D from "./three/CoreStrengths3D";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Static export kept empty — real data comes from API inside ProductService
export const products = [];

export const ProductService = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── API: load products from backend ──────────────────────────────────────
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("http://172.31.92.141:5000/api/products")
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
      .catch(() => {});
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
        minHeight: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0 5%",
        paddingTop: "80px",
        paddingBottom: "120px",
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
          PRODUCT & SERVICE
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
          Forged in extreme intensity. We provide exceptional structural
          solutions designed to act as the unyielding backbone of tomorrow's
          infrastructure.
        </p>

        {products.length === 0 ? (
          <div style={{ color: "var(--subtext)", marginTop: "4rem", fontSize: "1rem" }}>
            Loading products...
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
                        Learn More
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
              <h4 style={{ color: "var(--accent)", marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>KEY SPECIFICATIONS</h4>
              <ul className="product-spec-list">
                <li>Ultimate Tensile Strength: 500 MPa</li>
                <li>Excellent Weldability and Bendability</li>
                <li>Earthquake Resistant Properties</li>
                <li>Advanced Rib Design for better bonding</li>
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
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutUs = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const founderImgRef = useRef(null);
  const mdImgRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(
        founderImgRef.current,
        {
          yPercent: -20,
          opacity: 0,
          scale: 0.9,
          duration: 1,
        },
        0,
      );

      tl.to(
        textRef1.current,
        {
          opacity: 0,
          y: -50,
          duration: 1,
        },
        0,
      );

      tl.fromTo(
        mdImgRef.current,
        {
          yPercent: 50,
          opacity: 0,
          scale: 1.1,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        0.5,
      );

      tl.fromTo(
        textRef2.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        0.5,
      );
    },
    { scope: sectionRef },
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
            // VISION & LEADERSHIP
          </p>

          <div style={{ position: "relative", width: "100%", height: "300px" }}>
            <div
              ref={textRef1}
              style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
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
                BUILDING A <br />
                LEGACY OF <br />
                <span className="accent-text">STEEL.</span>
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
                "Our foundation isn't just laid in concrete; it's forged in
                unwavering commitment and intense heat. We started with a vision
                to build the unbuildable."
              </p>
              <h4
                style={{
                  marginTop: "2rem",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.1em",
                  color: "var(--text)",
                }}
              >
                LATE ANWAR HOSSAIN
              </h4>
              <p
                style={{
                  fontFamily: "monospace",
                  color: "var(--subtext)",
                  fontSize: "0.8rem",
                }}
              >
                FOUNDER, ANWAR GROUP
              </p>
            </div>

            <div
              ref={textRef2}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                opacity: 0,
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
                ENGINEERING <br />
                THE NEXT <br />
                <span className="accent-text">CENTURY.</span>
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
                "We don't just supply materials; we engineer the resilience
                required to propel Bangladesh into the forefront of monumental
                infrastructure."
              </p>
              <h4
                style={{
                  marginTop: "2rem",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.1em",
                  color: "var(--text)",
                }}
              >
                MANWAR HOSSAIN
              </h4>
              <p
                style={{
                  fontFamily: "monospace",
                  color: "var(--subtext)",
                  fontSize: "0.8rem",
                }}
              >
                GROUP MANAGING DIRECTOR
              </p>
            </div>
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

          <img
            ref={founderImgRef}
            className="founder-img"
            src="/founder.webp"
            alt="Founder Anwar Hossain"
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
            }}
          />

          <img
            ref={mdImgRef}
            className="md-img"
            src="/md.webp"
            alt="MD Manwar Hossain"
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
              opacity: 0,
            }}
          />

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
        <h3 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--text-primary, #fff)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
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
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleMilestones, setVisibleMilestones] = useState([]);

  const milestones = [
    {
      title: "190+ YEARS OF LEGACY",
      desc: "Part of the prestigious Anwar Group, building trust in Bangladesh since 1834.",
      icon: History,
      align: "left"
    },
    {
      title: "EUROPEAN TECHNOLOGY",
      desc: "The only manufacturer in Bangladesh using patented TMT technology from Belgium for superior reinforcement.",
      icon: Globe,
      align: "right"
    },
    {
      title: "PIONEER IN INNOVATION",
      desc: "The trailblazer in the Bangladesh steel industry, being the first to introduce 60-Grade reinforcement bars to the country.",
      icon: Zap,
      align: "left"
    },
    {
      title: "EARTHQUAKE RESISTANT",
      desc: "Engineered with a high TS/YS ratio for maximum ductility, meeting strict BNBC and ACI safety codes.",
      icon: Shield,
      align: "right"
    },
    {
      title: "PRECISION QUALITY",
      desc: "Every batch is tested via Spectrometer (28-element analysis) to ensure 100% compliance with BSTI and ISO standards.",
      icon: Target,
      align: "left"
    },
    {
      title: "NATION BUILDER",
      desc: "A proven partner for Bangladesh's iconic mega-projects and thousands of individual homes.",
      icon: Building2,
      align: "right"
    }
  ];

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
      minHeight: '100vh',
      background: 'var(--bg-section, rgba(11, 11, 11, 0.7))',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255, 60, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 60, 0, 0.1)',
      position: 'relative',
      zIndex: 10,
      padding: '8rem 5%',
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
          THE FORGED PATH
        </p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', color: 'var(--text-primary, #fff)', lineHeight: 1, textTransform: 'uppercase' }}>
          WHY CHOOSE US?
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
  const projects = [
    { title: "Padma Bridge", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390678/Padma_Bridge_fnueme.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390678/Padma_Bridge_fnueme.jpg", desc: "A monumental infrastructure achievement connecting the nation." },
    { title: "Rooppur Power Plant", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390681/Rooppur_en98hz.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777390681/Rooppur_en98hz.jpg", desc: "Bangladesh's first nuclear power plant, empowering the future." },
    { title: "Mayor Hanif Flyover", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394650/mayor_hanif_msgq9d.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394650/mayor_hanif_msgq9d.jpg", desc: "Revolutionizing urban transit and reducing city congestion." },
    { title: "Purbachal Express Highway", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394690/Purbachal_Express_Highway_compressed_gxuze8.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777394690/Purbachal_Express_Highway_compressed_gxuze8.jpg", desc: "A massive arterial highway facilitating rapid economic growth." },
    { title: "Airport 3rd Terminal", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395501/Airport_3rd_Terminal_brxz6w.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395501/Airport_3rd_Terminal_brxz6w.jpg", desc: "State-of-the-art aviation hub elevating global connectivity." },
    { title: "Shahjalal Fertilizer Factory", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395915/Shahjalal_Fertiliser_Factory_gefg5s.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777395915/Shahjalal_Fertiliser_Factory_gefg5s.jpg", desc: "A critical industrial mega-project ensuring agricultural self-reliance." },
    { title: "Hotel Intercontinental", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396432/Hotel_Intercontinental_k6assz.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396432/Hotel_Intercontinental_k6assz.jpg", desc: "Iconic luxury and heritage built on unwavering structural strength." },
    { title: "City Center Dhaka", video: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396567/City_Center_Dhaka_jzcyar.mp4", poster: "https://res.cloudinary.com/dswgpcl6a/video/upload/v1777396567/City_Center_Dhaka_jzcyar.jpg", desc: "The tallest skyscraper defining the modern skyline of the capital." }
  ];

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
      >
        <video
          ref={videoRef}
          preload="none"
          loop
          muted
          playsInline
          className="project-video"
          poster={proj.poster}
          src={isLoaded ? proj.video : undefined}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(80%) brightness(0.6)', transition: 'all 0.5s ease' }}
        />
        <div className="project-overlay" style={{ position: 'absolute', inset: 0, background: isHovered ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(227,24,45,0.2) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', transition: 'all 0.3s ease' }}>
          <h3 style={{ color: '#fff', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', textTransform: 'uppercase', transform: isHovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.4s ease' }} className="project-title">{proj.title}</h3>
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
        minHeight: "100vh",
        background: "var(--bg-section, rgba(11, 11, 11, 0.7))",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255, 60, 0, 0.1)",
        padding: "8rem 5%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "0.9rem" }}>
          NATION BUILDERS
        </p>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--text)", lineHeight: 1.1, textTransform: "uppercase", fontFamily: "var(--font-heading)" }}>
          MEGA <span className="accent-text">PROJECTS</span>
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
          .project-card .project-title { transform: translateY(0) !important; }
        }
      `}</style>
    </section>
  );
};

export const MediaEvents = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ── API: load media posts from backend ───────────────────────────────────
  const [broadcastData, setBroadcastData] = useState([]);

  useEffect(() => {
    fetch("http://172.31.92.141:5000/api/media")
      .then((r) => r.json())
      .then((data) => {
        setBroadcastData(
          data.map((m) => ({
            date: m.event_date
              ? m.event_date.toUpperCase() + " - " + (m.category || "LOCAL")
              : (m.category || "LOCAL"),
            title: m.title,
            desc: m.description || "",
            img: m.image_url
              ? m.image_url
              : "https://images.unsplash.com/photo-1541888053158-b6fe071d3714?auto=format&fit=crop&q=80&w=600",
          }))
        );
      })
      .catch(() => {});
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      id="media-events"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(11, 11, 11, 0.7)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        padding: "4rem 5%",
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
            <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", fontSize: "0.9rem", margin: 0 }}>NEWS DESK</p>
          </div>
          <h2 className="accent-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", lineHeight: "0.9" }}>
            MEDIA &<br />EVENTS
          </h2>
          <p style={{ color: "var(--subtext)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            Constant motion. Constant innovation. Tap into our live broadcasting
            feed to stay updated with structural advancements across the nation.
          </p>
          <a href="#all-events" className="magnetic-btn" style={{ fontSize: "0.85rem", padding: "1rem 2rem", marginTop: 0, background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>
            ACCESS FULL TERMINAL
          </a>
        </div>

        <div
          className="marquee-container"
          style={{ flex: "1 1 500px", minWidth: "400px", height: "clamp(400px, 60vh, 80vh)", position: "relative", perspective: "1000px", display: "flex", alignItems: "center" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "150px", zIndex: 5, pointerEvents: "none" }}></div>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "150px", zIndex: 5, pointerEvents: "none" }}></div>

          {broadcastData.length === 0 ? (
            <div style={{ color: "var(--subtext)", textAlign: "center", width: "100%", fontSize: "0.9rem" }}>
              Loading media posts...
            </div>
          ) : (
            <div
              className="broadcast-marquee"
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem", transformStyle: "preserve-3d", animation: isHovered ? "none" : "scrollUp 25s linear infinite", animationPlayState: isHovered ? "paused" : "running", transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              {[...broadcastData, ...broadcastData, ...broadcastData].map((event, index) => (
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
          #media-events { padding: 6rem 5% !important; height: auto !important; }
          .media-events-container { height: auto !important; flex-direction: column !important; gap: 2rem !important; }
          .media-text-content { margin-bottom: 2rem; }
          .marquee-container { perspective: none !important; height: 60vh !important; width: 100% !important; }
          .broadcast-marquee { transform: none !important; animation: scrollUpMobile 20s linear infinite !important; }
        }
      `}</style>
    </section>
  );
};

const InsightCarouselCard = ({ category, title, readTime, img, index, currentIndex }) => {
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
          <a href="#read" className="magnetic-btn" style={{ margin: 0, padding: "clamp(0.5rem, 1.5vh, 0.8rem) clamp(1rem, 3vmin, 1.5rem)", fontSize: "clamp(0.6rem, 2vmin, 0.8rem)", borderRadius: "4px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>INITIATE FEED</a>
        </div>
      </div>
      {isActive && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(227, 24, 45, 0.1), transparent 60%)", pointerEvents: "none", borderRadius: "16px" }}></div>}
    </div>
  );
};

export const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const insights = [
    { category: "Engineering Analysis", title: "The Physics of 500W: Tension, Yield, and Structural Absolute", readTime: "06:00 MIN", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800" },
    { category: "Sustainable Future", title: "Achieving Net-Zero: Algorithms Controlling Carbon Outputs", readTime: "08:30 MIN", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" },
    { category: "Project Architectural", title: "Bridging the Divide: Logistics of Mega-Ton Deliveries", readTime: "04:45 MIN", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % insights.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);

  return (
    <section id="blog" style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center", background: "var(--bg-section, rgba(11, 11, 11, 0.7))", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", position: "relative", zIndex: 10, padding: "clamp(4rem, 10vh, 8rem) 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto clamp(2rem, 5vh, 4rem) auto", position: "relative", zIndex: 20, padding: "0 5%" }}>
        <p style={{ fontFamily: "monospace", color: "var(--subtext)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "0.9rem" }}>[ SYSTEM.ARCHIVES.OPEN ]</p>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", lineHeight: "1.1", textTransform: "uppercase", marginBottom: "1.5rem" }}>INSIGHTS &<br />INNOVATIONS</h2>
      </div>

      <div style={{ position: "relative", height: "clamp(300px, min(60vw, 60vh), 480px)", width: "100%", perspective: "1500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {insights.map((insight, idx) => (
          <InsightCarouselCard key={idx} index={idx} currentIndex={currentIndex} {...insight} />
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

export const Footer = ({ onOpenContact }) => (
  <footer style={{ width: "100%", padding: "4rem 10% 2rem 10%", backgroundColor: "var(--primary)", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 10 }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", marginBottom: "4rem" }}>
      <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <img src="/Logo.png" alt="Anwar Ispat Logo" width="200" height="60" style={{ height: "clamp(50px, 8vw, 80px)", width: "auto", objectFit: "contain", objectPosition: "left", marginBottom: "1.5rem", filter: "grayscale(100%) brightness(200%)" }} />
        <p style={{ color: "var(--subtext)", fontSize: "0.9rem", lineHeight: "1.6", maxWidth: "300px" }}>
          Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.
        </p>
        <button onClick={onOpenContact} className="magnetic-btn" style={{ fontSize: "0.8rem", padding: "0.8rem 1.5rem" }}>CONTACT US</button>
      </div>
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>QUICK LINKS</h4>
          {[["#product-service","Product & Service"],["#better-tomorrow","Better Tomorrow"],["#career","Career"],["#media-events","Media & Events"]].map(([href,label])=>(
            <a key={href} href={href} style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>LEGAL</h4>
          <a href="#" style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.9rem" }}>Terms of Service</a>
        </div>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <p style={{ color: "var(--subtext)", fontSize: "0.8rem" }}>&copy; {new Date().getFullYear()} Anwar Ispat. All Rights Reserved.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Facebook","LinkedIn","Twitter"].map(s=><a key={s} href="#" style={{ color: "var(--subtext)", textDecoration: "none", fontSize: "0.8rem" }}>{s}</a>)}
      </div>
    </div>
  </footer>
);

export const CoreStrengths = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', position: 'relative', background: 'var(--bg-section, rgba(11, 11, 11, 0.7))', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255, 60, 0, 0.1)', borderBottom: '1px solid rgba(255, 60, 0, 0.1)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 5%' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(227, 24, 45, 0.03) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to bottom, var(--bg-main) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, var(--bg-main) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3 }}>
        <Canvas camera={{ position: [0, 4, 16], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: "low-power" }}>
          <CoreStrengths3D inView={inView} />
        </Canvas>
      </div>
    </section>
  );
};





